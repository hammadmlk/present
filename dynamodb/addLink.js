const Promise = require('promise');
const util = require('util');

const createEmptyLink = function(id) {
    return {
        id: id,
    //txt: "link", //text is a reserved word in dynamodb
    //href: "url here"
    }
}

// Adds link to a bullet of a slide of a presentation and returns the link added
function addLink(docClient, tableName, presentationID, slideID, bulletID) {

    return createUniqueLinkId(docClient, tableName, presentationID, slideID, bulletID).then(function(newLinkID) {

        const params = {
            TableName: tableName,
            Key: {
                "UID": presentationID
            },
            UpdateExpression: util.format("set slides.%s.bullets.%s.links.%s = :newLink", slideID, bulletID, newLinkID),
            ExpressionAttributeValues: {
                ":newLink": createEmptyLink(newLinkID)
            },
            ReturnValues: "UPDATED_NEW"
        };

        return new Promise(function(resolve, reject) {
            docClient.update(params, function(err, data) {
                if (err) reject(err); else {
                    resolve(data.Attributes.slides[slideID].bullets[bulletID].links[newLinkID]);
                }
            });
        })
    });
}

// Create Link UID bullet of slide of Presentation (example link UID l1, l13 etc)
const createUniqueLinkId = function(docClient, tableName, presentationID, slideID, bulletID) {
    const LINK_UID_PREFIX = "l";

    const params = {
        TableName: tableName,
        Key: {
            "UID": presentationID,
        },
        UpdateExpression: util.format("add slides.%s.bullets.%s.linkUIDIncrementer :n", slideID, bulletID),
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
                const newLinkID = LINK_UID_PREFIX + data.Attributes.slides[slideID].bullets[bulletID].linkUIDIncrementer;
                resolve(newLinkID);
            }
        });
    });

}

module.exports = addLink;