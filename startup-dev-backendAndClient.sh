#!/bin/bash

set -eu

echo "Remove db/ manually if needed"
npm install  # Server install
(sleep 10;
node script/populateUsers.js  # Populate Users
node script/populateItem.js  # Populate Item
node script/populatePlan.js  # Populate Plan
node script/populateFeed.js  # Populate Plan
)&
npm run dev  # Server serve
