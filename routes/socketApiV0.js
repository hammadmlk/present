const debug = require('debug')('socketApiV0');
const databaseController = require('../dynamodb/databaseController')

// TODO: this file needs a major rector
// TODO: databaseController should return promises
// TODO: need a class for standardized error message creation
// TODO: when somethng goes wrong we need to emit errors.


const socketApiV0 = function(io) {
    io.on('connection', function(socket) {

        // sent data to the socket that just connected
        socketEmitPresentationData(socket, 1);

        socket.on('update slide title', function(data) {
            const presentationID = data.presentationID;
            databaseController.putSlide(data.presentationID, data.slideID, "title", data.newValue)
                .then(function(res) {
                    console.log("update slide title RES", res)
                    broadcastPresentationData(socket, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("update slide title ERR", err)

                })
        });

        socket.on('update slide subTitle', function(data) {
            const presentationID = data.presentationID;
            databaseController.putSlide(data.presentationID, data.slideID, "subTitle", data.newValue)
                .then(function(res) {
                    console.log("update slide subTitle RES", res)
                    broadcastPresentationData(socket, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("update slide subTitle ERR", err)
                })
        });

        socket.on('update bullet text', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;
            const bulletID = data.bulletID;
            const newValue = data.newValue;

            databaseController.putBullet(presentationID, slideID, bulletID, "txt", newValue)
                .then(function(res) {
                    console.log("update bullet text RES", res)
                    broadcastPresentationData(socket, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("update bullet text ERR", err)
                })
        });

        socket.on('update bullet tag', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;
            const bulletID = data.bulletID;
            const newValue = data.newValue;

            databaseController.putBullet(presentationID, slideID, bulletID, "tag", newValue)
                .then(function(res) {
                    console.log("update bullet tag RES", res)
                    broadcastPresentationData(socket, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("update bullet tag ERR", err)
                })
        });

        socket.on('update link text', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;
            const bulletID = data.bulletID;
            const linkID = data.linkID;
            const newValue = data.newValue;

            databaseController.putLink(presentationID, slideID, bulletID, linkID, "txt", newValue)
                .then(function(res) {
                    console.log("update link text RES", res)
                    broadcastPresentationData(socket, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("update link text ERR", err)
                })
        });

        socket.on('update link url', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;
            const bulletID = data.bulletID;
            const linkID = data.linkID;
            const newValue = data.newValue;

            databaseController.putLink(presentationID, slideID, bulletID, linkID, "href", newValue)
                .then(function(res) {
                    console.log("update link url RES", res)
                    broadcastPresentationData(socket, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("update link url ERR", err)
                })
        });

        socket.on('add bullet', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;

            databaseController.addBullet(presentationID, slideID)
                .then(function(res) {
                    console.log("add bullet RES", res)
                    ioEmitPresentationData(io, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("add bullet ERR", err)
                })
        });

        socket.on('add link', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;
            const bulletID = data.bulletID;

            databaseController.addLink(presentationID, slideID, bulletID)
                .then(function(res) {
                    console.log("add link RES", res)
                    ioEmitPresentationData(io, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("add link ERR", err)
                })
        });

        socket.on('delete bullet', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;
            const bulletID = data.bulletID;

            databaseController.deleteBullet(presentationID, slideID, bulletID)
                .then(function(res) {
                    console.log("delete bullet RES", res)
                    ioEmitPresentationData(io, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("delete bullet ERR", err)
                })
        });

        socket.on('delete link', function(data) {
            const presentationID = data.presentationID;
            const slideID = data.slideID;
            const bulletID = data.bulletID;
            const linkID = data.linkID;

            databaseController.deleteLink(presentationID, slideID, bulletID, linkID)
                .then(function(res) {
                    console.log("delete link RES", res)
                    ioEmitPresentationData(io, presentationID)
                })
                .catch(function(err) {
                    // emit error
                    console.log("delete link ERR", err)
                })
        });

    });
}

module.exports = socketApiV0;

// HELPERS

// sending to all clients except sender
var broadcastPresentationData = function(socket, presentationID) {
    _emitPresentationData(socket.broadcast, presentationID)
}

// sending to sender-client only
var socketEmitPresentationData = function(socket, presentationID) {
    _emitPresentationData(socket, presentationID)
}

// sending to all clients, include sender
var ioEmitPresentationData = function(io, presentationID) {
    _emitPresentationData(io.sockets, presentationID)
}

var _emitPresentationData = function(connection, presentationID) {

    var presentationData = databaseController.getPresentation(presentationID)
        .then(function(dbPresentation) {
            var clientPresentation = _convertPresentationDBModelToReactClientModel(dbPresentation);
            connection.emit("presentation has new data", clientPresentation);
        })
        .catch(function(err) {
            // emit error
            console.log("ERR", err)

        })
}

var _convertPresentationDBModelToReactClientModel = function(dbModel) {
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
            bulletClientModel.text = bulletDbModel.txt;
            bulletClientModel.tag = bulletDbModel.tag;

            bulletClientModel.linkList = Object.keys(bulletDbModel.links).map(function(linkKey) {
                var linkDbModel = bulletDbModel.links[linkKey];
                var linkClientModel = {};
                linkClientModel.id = linkKey;
                linkClientModel.text = linkDbModel.txt;
                linkClientModel.url = linkDbModel.href;
                return linkClientModel;
            });
            bulletClientModel.linkList.sort(function(a, b) {
                return parseInt(a.id.substring(1)) > parseInt(b.id.substring(1));
            })

            return bulletClientModel;
        });

        slideClientModel.bulletList.sort(function(a, b) {
            return parseInt(a.id.substring(1)) > parseInt(b.id.substring(1));
        })

        return slideClientModel;
    });

    clientModel.slideList.sort(function(a, b) {
        return parseInt(a.id.substring(1)) > parseInt(b.id.substring(1));
    })

    return clientModel;
}

