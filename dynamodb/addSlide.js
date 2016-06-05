const Promise = require('promise');
const util = require('util');

const createEmptySlide = function(id) {
    return {
        id: id,
        title: "",
        subTitle: "",
        bullets: {}
    }
}

// Adds slide to presentation and returns the slide added
function addSlide(docClient, tableName, presentationID, callback) {

    createUniqueSlideId(docClient, tableName, presentationID).then(function(newSlideID) {

        const params = {
            TableName: tableName,
            Key: {
                "UID": presentationID
            },
            UpdateExpression: util.format("set slides.%s = :newSlide", newSlideID),
            ExpressionAttributeValues: {
                ":newSlide": createEmptySlide(newSlideID)
            },
            ReturnValues: "UPDATED_NEW"
        };

        docClient.update(params, function(err, data) {
            if (err) {
                callback(err, data);
            } else {
                callback(err, data.Attributes.slides[newSlideID])
            }
        });
    });
}

// Create slide UID for Presentation (example slide UID s1, s13 etc)
const createUniqueSlideId = function(docClient, tableName, presentationID) {
    const SlideUIDPrefix = "s";

    const params = {
        TableName: tableName,
        Key: {
            "UID": presentationID,
        },
        UpdateExpression: "add slideUIDIncrementer :n",
        ExpressionAttributeValues: {
            ":n": 1
        },
        ReturnValues: 'UPDATED_NEW',
    }

    const promise = new Promise(function(resolve, reject) {
        docClient.update(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                const newSlideID = SlideUIDPrefix + data.Attributes.slideUIDIncrementer;
                resolve(newSlideID);
            }
        });
    });

    return promise;

}

module.exports = addSlide;