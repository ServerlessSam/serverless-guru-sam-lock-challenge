'use strict';
const AWS = require('aws-sdk');

module.exports.updateGuru = async (event) => {
    const pathParams = event.pathParameters;
    const body = JSON.parse(Buffer.from(event.body).toString());
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const updateParams = {
      TableName: process.env.DYNAMODB_GURU_TABLE,
      Key: {
        "primary_key": pathParams.name
      },
      UpdateExpression: "set speciality = :x",
        ExpressionAttributeValues: {
            ":x": body.speciality
        },
    ConditionExpression: "attribute_exists(primary_key)"
    };
    try {
        await dynamoDb.update(updateParams).promise();
    }
    catch (ConditionalCheckFailedException) {
        return {
            statusCode: 404,
        }
    }
   
    return {
      statusCode: 200,
    };
  };