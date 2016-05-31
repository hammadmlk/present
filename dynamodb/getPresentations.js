
var getPresentations = function(docClient, tableName, callback) {
    var params = {
        TableName: tableName,
    };
    docClient.scan(params, function(err, data) {
        callback(err, data)
    });
}

module.exports = getPresentations;