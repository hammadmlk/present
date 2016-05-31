
var getPresentation = function(docClient, tableName, UID, callback) {
    var params = {
        TableName: tableName,
        Key: {
            "UID": UID
        }
    };
    docClient.get(params, function(err, data) {
        callback(err, data);
    });
}

module.exports = getPresentation;