const Promise = require('promise');
var util = require('util');

// TODO: Validate attrPath to block updating of unwanted paths
// TODO: Validate attrValue to block updating to invalid values

const putPresentation = function(docClient, tableName, presentationID, attrName, attrValue) {
    const attrPath = attrName;
    return putAttributeByPath(docClient, tableName, presentationID, attrPath, attrValue)
}

const putSlide = function(docClient, tableName, presentationID, slideID, attrName, attrValue) {
    const attrPath = util.format("slides.%s.%s", slideID, attrName);
    return putAttributeByPath(docClient, tableName, presentationID, attrPath, attrValue)
}

const putBullet = function(docClient, tableName, presentationID, slideID, bulletID, attrName, attrValue) {
    const attrPath = util.format("slides.%s.bullets.%s.%s", slideID, bulletID, attrName);
    return putAttributeByPath(docClient, tableName, presentationID, attrPath, attrValue)
}

const putLink = function() {
    // TODO  
}

const putAttributeByPath = function(docClient, tableName, presentationID, attrPath, attrValue) {

    var params = {
        TableName: tableName,
        Key: {
            "UID": presentationID
        },
        UpdateExpression: util.format("set %s = :attrValue", attrPath),
        ExpressionAttributeValues: {
            ":attrValue": attrValue,
        },
        ReturnValues: "UPDATED_NEW"
    };

    console.log("updating params", params)

    return new Promise(function(resolve, reject) {
        docClient.update(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

const putAttribute = {
    putPresentation: putPresentation,
    putSlide: putSlide,
    putBullet: putBullet,
    putLink: putLink
}



module.exports = putAttribute;