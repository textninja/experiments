#!/bin/bash

# Substitute environment variables in cron.yaml.temlate using .env from container
# directory, then deploy.

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
cd "$SCRIPT_DIR/../container"
yarn && cat ../deployment/cron.yaml.template | npx dotenv envsubst | kubectl apply -f -
