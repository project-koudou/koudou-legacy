#!/bin/bash

set -eu

cd nodered-local
npm install  # Node-RED install
# TODO: Clean up
(sleep 10; curl -X POST http://localhost:9000/red/flows -H "Content-Type: application/json" --data "@../nodered-lib/flows/flows-all.json")&
node index.js  # NOde-RED serve