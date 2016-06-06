const Promise = require('promise');

var getPresentations = function(docClient, tableName) {
    var params = {
        TableName: tableName,
    };

    return new Promise(function(resolve, reject) {
        docClient.scan(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

module.exports = getPresentations;