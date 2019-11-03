#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=0f381f726d9d0ec00f3754c2e6863eeb7e2eb5bd\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/jphacks/NG_1904/tree/maitake
