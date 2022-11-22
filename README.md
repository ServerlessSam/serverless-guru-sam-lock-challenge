# serverless-guru-sam-lock-challenge

This repository contains everything needed to develop and deploy the Guru API.

It is a CRUD API using Lambda, API gateway and DynamoDB for compute/storage, GitHub Actions for CI/CD and the Serverless Framework as the key development/deployment tool.

# Deployment

This repo supports a dev and prod environment in AWS.

The dev environment is deployed to on every push to the main branch.
The prod environment is deployed to on every GitHub "deployment"

## GitHub Deployment

To trigger a github deployment you can use the following GitHub CLI command:

```
gh api   --method POST   -H "Accept: application/vnd.github+json"   /repos/ServerlessSam/serverless-guru-sam-lock-challenge/deployments  -f ref='main'
```

You will need the GitHub cli installed and authentication set up. You many use the following command for this:

```
gh auth login
```
 
# Development

The Serverless Framework does not support local invocation of your lambda functions, or a local deployment of DynamoDB. Your Serverless Framework local options can be learned about [here](https://www.serverless.com/blog/serverless-local-development).

A better pattern is to deploy your own environment into AWS using the following Serverless Framework CLI command:

```
serverless deploy --stage <something unique>
```
