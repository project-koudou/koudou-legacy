#!/bin/sh

set -eu

node script/populateUsers.js  # Populate Users
node script/populatePlan.js  # Populate Plan
node script/populateFeed.js  # Populate Plan
node script/populateItem.js  # Populate Item
# curl -X POST http://localhost:9000/red/flows -H "Content-Type: application/json" --data "@../nodered-lib/flows/flows-all.json"  # Node-RED
