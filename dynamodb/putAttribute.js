var util = require('util');

// TODO: Validate attrPath to block updating of unwanted paths
// TODO: Validate attrValue to block updating to invalid values

const putPresentation = function(docClient, tableName, presentationID, attrName, attrValue, callback) {
    const attrPath = attrName;
    putAttributeByPath(docClient, tableName, presentationID, attrPath, attrValue, callback)
}

const putSlide = function(docClient, tableName, presentationID, slideID, attrName, attrValue, callback) {
    const attrPath = util.format("slides.%s.%s", slideID, attrName);
    putAttributeByPath(docClient, tableName, presentationID, attrPath, attrValue, callback)
}

const putBullet = function(docClient, tableName, presentationID, slideID, bulletID, attrName, attrValue, callback) {
    const attrPath = util.format("slides.%s.bullets.%s.%s", slideID, bulletID, attrName);
    putAttributeByPath(docClient, tableName, presentationID, attrPath, attrValue, callback)
}

const putLink = function() {
    // TODO  
}

const putAttributeByPath = function(docClient, tableName, presentationID, attrPath, attrValue, callback) {

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

    console.log(params)

    docClient.update(params, function(err, data) {
        callback(err, data);
    });
}

const putAttribute = {
    putPresentation: putPresentation,
    putSlide: putSlide,
    putBullet: putBullet,
    putLink: putLink
}



module.exports = putAttribute;