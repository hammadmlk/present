const Promise = require('promise');
const util = require('util');

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

const putLink = function(docClient, tableName, presentationID, slideID, bulletID, linkID, attrName, attrValue) {
    const attrPath = util.format("slides.%s.bullets.%s.links.%s.%s", slideID, bulletID, linkID, attrName);
    return putAttributeByPath(docClient, tableName, presentationID, attrPath, attrValue)
}

const putAttributeByPath = function(docClient, tableName, presentationID, attrPath, attrValue) {
    var params = {
        TableName: tableName,
        Key: {
            "UID": presentationID
        },
        ReturnValues: "UPDATED_NEW"
    }

    // dynamo doesnt allow setting empty values for attributes. 
    // So when the attrValue is empty, we call 'remove attrPath' instead of 'set attrPath: attrValue'. 
    if (attrValue) {
        params.UpdateExpression = util.format("set %s = :attrValue", attrPath);
        params.ExpressionAttributeValues = {
            ":attrValue": attrValue
        }
    } else {
        params.UpdateExpression = util.format("remove %s", attrPath);
    }

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