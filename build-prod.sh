#!/bin/sh

set -eu

cd frontend
npm install  # Frontend install
npm run build  # Frontend build
cd ..
npm install --production  # Server install
node script/populateUsers.js  # Populate Users
node script/populatePlan.js  # Populate Plan
node script/populateFeed.js  # Populate Plan
node script/populateItem.js  # Populate Item
