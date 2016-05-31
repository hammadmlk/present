//
// WARNING - THIS SCRIPT WILL DELETE THE TABLE FROM DATABASE AND CREATE A NEW EMPTY TABLE
//

// TODO: Add a conditional that stops this script form running in production env

const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB();

const tableName = "Presentations";

const deleteParams = {
    TableName: tableName
};

const createParams = {
    TableName: tableName,
    AttributeDefinitions: [
        {
            AttributeName: "UID",
            AttributeType: "N"
        },
    ],
    KeySchema: [
        { //Partition key
            AttributeName: "UID",
            KeyType: "HASH"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

function recreate(callback) {
    dynamodb.deleteTable(deleteParams, function(err, data) {
        dynamodb.createTable(createParams, function(err, data) {
            callback(err, callback)
        });
    });
}

recreate();
