'use strict';
const AWS = require('aws-sdk');

module.exports.deleteGuru = async (event) => {
    const pathParams = event.pathParameters;
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const deleteParams = {
      TableName: process.env.DYNAMODB_GURU_TABLE,
      Key: { primary_key : pathParams.name },
      ConditionExpression: "attribute_exists(primary_key)"
    };
    try{
        await dynamoDb.delete(deleteParams).promise();
    }
    catch (ConditionalCheckFailedException) {
        return {
            statusCode: 404
        }
    }
   
    return {
      statusCode: 200,
    };
  };