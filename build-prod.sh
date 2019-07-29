#!/bin/sh

set -eu

cd frontend
npm install --no-progress  # Frontend install
npm run build  # Frontend build
cd ..
npm install --production --no-progress --unsafe-perm  # Server install
