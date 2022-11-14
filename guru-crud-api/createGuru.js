'use strict';
const AWS = require('aws-sdk');
 
module.exports.createGuru = async (event) => {
  console.log(event.body)
  const body = JSON.parse(Buffer.from(event.body).toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_GURU_TABLE,
    Item: {
      primary_key: body.name,
      speciality: body.speciality,
    },
    ConditionExpression: "attribute_not_exists(primary_key)"
  };
  try {
    await dynamoDb.put(putParams).promise();
  }
  catch (ConditionalCheckFailedException) {
    return {
      statusCode: 400,
      body: `Guru ${body.name} already exists`
    }
  }
  return {
    statusCode: 201,
  };
};