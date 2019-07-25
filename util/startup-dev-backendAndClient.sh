#!/bin/bash

set -eu

echo "Remove db/ manually if needed"
npm install  # Server install
node script/populateUsers.js  # Populate Users
node script/populatePlan.js  # Populate Plan
node script/populateFeed.js  # Populate Plan
node script/populateItem.js  # Populate Item
npm run dev  # Server serve
