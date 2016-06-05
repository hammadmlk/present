const debug = require('debug')('socketApiV0');
const databaseController = require('../dynamodb/databaseController')

// TODO: this file needs a major rector
// TODO: databaseController should return promises
// TODO: need a class for standardized error message creation
// TODO: when somethng goes wrong we need to emit errors.

const socketApiV0 = function(io) {
    io.on('connection', function(socket) {

        // TODO: We dont want to emit to all sockets every time a client connects
        emitPresentationData(io, 1);

        socket.on('update slide title', function(data) {
            const presentationID = data.presentationID;
            databaseController.putSlide(data.presentationID, data.slideID, "title", data.newValue, function(err, data) {
                if (err) {
                    // emit error
                } else {
                    emitPresentationData(io, presentationID)
                }
            })
        });

        socket.on('update slide subTitle', function(data) {
            const presentationID = data.presentationID;
            databaseController.putSlide(data.presentationID, data.slideID, "subTitle", data.newValue, function(err, data) {
                if (err) {
                    // emit error
                } else {
                    emitPresentationData(io, presentationID)
                }
            })
        });

    });
}

module.exports = socketApiV0;


// HELPERS

var emitPresentationData = function(io, presentationID) {
    var presentationData = databaseController.getPresentation(presentationID, function(err, dbPresentation) {
        if (err) {
            // emit error
        } else {
            var clientPresentation = convertPresentationDBModelToReactClientModel(dbPresentation);
            io.sockets.emit("presentation has new data", clientPresentation);
        }
    })
}

var convertPresentationDBModelToReactClientModel = function(dbModel) {
    var clientModel = {};
    clientModel.id = dbModel.UID;
    clientModel.title = dbModel.title;
    clientModel.slideList = Object.keys(dbModel.slides).map(function(slideKey) {
        var slideDbModel = dbModel.slides[slideKey];
        var slideClientModel = {};

        slideClientModel.id = slideKey;
        slideClientModel.title = slideDbModel.title;
        slideClientModel.subTitle = slideDbModel.subTitle;

        slideClientModel.bulletList = Object.keys(slideDbModel.bullets).map(function(bulletKey) {
            var bulletDbModel = slideDbModel.bullets[bulletKey];
            var bulletClientModel = {};
            bulletClientModel.id = bulletKey;
            // TODO: complete the bullet model. And children.
            return bulletClientModel;
        });

        slideClientModel.bulletList.sort(function(a, b) {
            return a.id > b.id;
        })

        return slideClientModel;
    });

    clientModel.slideList.sort(function(a, b) {
        return a.id > b.id;
    })

    return clientModel;
}