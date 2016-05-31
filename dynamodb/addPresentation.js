const Promise = require('promise');

// Adds presentation to db and returns the presenttion added
function addPresentation(docClient, tableName, presentationName, callback) {

    createUniquePresentationId(docClient, tableName).then(function(newUID) {

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

        docClient.put(params, function(err, data) {
            if (err) {
                callback(err, data);
            } else {
                callback(err, params.Item)
            }
        });
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

    var promise = new Promise(function(resolve, reject) {
        docClient.update(params, function(err, data) {
            if (err) reject(err);
            else resolve(data.Attributes.presentationUIDIncrementer);
        });
    });

    return promise;

}


module.exports = addPresentation;