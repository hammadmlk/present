const Promise = require('promise');
const util = require('util');

const createEmptyBullet = function(id) {
    return {
        id: id,
        //tag: "your name",
        //txt: "what cool stuff?", //text is a reserved word in dynamodb
        links: {}
    }
}

// Adds bullet to a slide of a presentation and returns the bullet added
function addBullet(docClient, tableName, presentationID, slideID) {

    return createUniqueBulletId(docClient, tableName, presentationID, slideID).then(function(newBulletID) {

        const params = {
            TableName: tableName,
            Key: {
                "UID": presentationID
            },
            UpdateExpression: util.format("set slides.%s.bullets.%s = :newBullet", slideID, newBulletID),
            ExpressionAttributeValues: {
                ":newBullet": createEmptyBullet(newBulletID)
            },
            ReturnValues: "UPDATED_NEW"
        };

        return new Promise(function(resolve, reject) {
            docClient.update(params, function(err, data) {
                if (err) reject(err); else {
                    resolve(data.Attributes.slides[slideID].bullets[newBulletID]);
                }
            });
        })
    });
}

// Create slide UID for Presentation (example bullet UID b1, b13 etc)
const createUniqueBulletId = function(docClient, tableName, presentationID, slideID) {
    const BULLET_UID_PREFIX = "b";

    const params = {
        TableName: tableName,
        Key: {
            "UID": presentationID,
        },
        UpdateExpression: util.format("add slides.%s.bulletUIDIncrementer :n", slideID),
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
                const newBulletID = BULLET_UID_PREFIX + data.Attributes.slides[slideID].bulletUIDIncrementer;
                resolve(newBulletID);
            }
        });
    });

}

module.exports = addBullet;