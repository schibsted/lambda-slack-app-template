#!/usr/bin/env bash

rm ./function.zip
zip -q -r function.zip .

aws lambda update-function-code \
  --function-name $AWS_LAMBDA_NAME \
  --zip-file fileb://$PWD/function.zip
