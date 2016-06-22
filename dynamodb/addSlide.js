const Promise = require('promise');
const util = require('util');

const createEmptySlide = function(id) {
    return {
        id: id,
        title: "Title here",
        subTitle: "Sub title here",
        bullets: {}
    }
}

// Adds slide to presentation and returns the slide added
function addSlide(docClient, tableName, presentationID) {

    return createUniqueSlideId(docClient, tableName, presentationID).then(function(newSlideID) {

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

        return new Promise(function(resolve, reject) {
            docClient.update(params, function(err, data) {
                if (err) reject(err);
                else resolve(data.Attributes.slides[newSlideID]);
            });
        })
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

    return new Promise(function(resolve, reject) {
        docClient.update(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                const newSlideID = SlideUIDPrefix + data.Attributes.slideUIDIncrementer;
                resolve(newSlideID);
            }
        });
    });

}

module.exports = addSlide;