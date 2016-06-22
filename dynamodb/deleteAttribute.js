const Promise = require('promise');
const util = require('util');


const deleteBullet = function(docClient, tableName, presentationID, slideID, bulletID) {
    const attrPath = util.format("slides.%s.bullets.%s", slideID, bulletID);
    return deleteAttributeByPath(docClient, tableName, presentationID, attrPath)
}

const deleteLink = function(docClient, tableName, presentationID, slideID, bulletID, linkID) {
    const attrPath = util.format("slides.%s.bullets.%s.links.%s", slideID, bulletID, linkID);
    return deleteAttributeByPath(docClient, tableName, presentationID, attrPath)
}

const deleteAttributeByPath = function(docClient, tableName, presentationID, attrPath) {

    var params = {
        TableName: tableName,
        Key: {
            "UID": presentationID
        },
        UpdateExpression: util.format("remove %s", attrPath),
        ReturnValues: "UPDATED_NEW"
    };

    console.log("deleting params", params)

    return new Promise(function(resolve, reject) {
        docClient.update(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

const deleteAttribute = {
    deleteBullet: deleteBullet,
    deleteLink: deleteLink
}

module.exports = deleteAttribute;