const Promise = require('promise');

//TODO: Return a valid error when data.Item is empty. I.e presentation does not exist

var getPresentation = function(docClient, tableName, UID) {
    var params = {
        TableName: tableName,
        Key: {
            "UID": UID
        }
    };

    return new Promise(function(resolve, reject) {
        docClient.get(params, function(err, data) {
            if (err || !data.Item) reject(err);
            else resolve(data.Item);
        });
    });
}

module.exports = getPresentation;