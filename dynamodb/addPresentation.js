const Promise = require('promise');

// Adds presentation to db and returns the presenttion added
function addPresentation(docClient, tableName, presentationName, callback) {

    return createUniquePresentationId(docClient, tableName).then(function(newUID) {

        var params = {
            TableName: tableName,
            Item: {
                UID: newUID,
                title: presentationName,
                slides: {}
            },
            ConditionExpression: "attribute_not_exists(UID)",
            ExpressionAttributeName: {
                "UID": newUID
            }
        };
        return new Promise(function(resolve, reject) {
            docClient.put(params, function(err, data) {
                if (err) reject(err);
                else resolve(params.Item);
            });
        })

    });
}

// Create UID for presentation
var createUniquePresentationId = function(docClient, tableName) {
    var params = {
        TableName: tableName,
        Key: {
            "UID": 0,
        },
        UpdateExpression: "add presentationUIDIncrementer :n",
        ExpressionAttributeValues: {
            ":n": 1
        },
        ReturnValues: 'UPDATED_NEW'
    }

    return new Promise(function(resolve, reject) {
        docClient.update(params, function(err, data) {
            if (err) reject(err);
            else resolve(data.Attributes.presentationUIDIncrementer);
        });
    });
}


module.exports = addPresentation;