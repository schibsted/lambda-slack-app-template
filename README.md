# Lamba Slack App template

[![Build Status](https://travis-ci.com/schibsted/lambda-slack-app-template.svg?branch=main)](https://travis-ci.com/schibsted/lambda-slack-app-template)
![License](https://img.shields.io/github/license/schibsted/lambda-slack-app-template)

Everything you need to get started on making a Slack App running on AWS Lambda.

## Dependencies

`$ npm run install --include=dev`

## Testing

`$ npm run test`

## Configuration

Set these environment variables:

* `SLACK_TOKEN` -- Slack app OAuth token

## Deploying

Create your Lambda, making sure to set "Enable function URL" (with authentication type "NONE")
under "Advanced settings". Set the environment variables you need under "Configuration" and
"Environment variables".

If you haven't already, remember to install and configure your `aws` command line interface:

* Log into your AWS Console and retrieve your IAM credentials.
* Run `aws configure` and follow the steps.

Finally, run `npm run deploy` to deploy.
