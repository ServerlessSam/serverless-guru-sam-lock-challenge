'use strict';
const AWS = require('aws-sdk');

module.exports.getGuru = async (event) => {
  const pathParams = event.pathParameters;
  const getParams = {
    TableName: process.env.DYNAMODB_GURU_TABLE,
    Key: { primary_key : pathParams.name }
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.get(getParams).promise();

  if (Object.keys(result).length === 0 ) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: await result.Item
    }),
  };
};