#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=40e932db1515acdc50c984b771e84e68fc1e7f15\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/jphacks/NG_1904/tree/maitake
