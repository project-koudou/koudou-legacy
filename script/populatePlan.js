const plan1 = require('../fixture/plan1.json');
const request = require('request-promise');

const BASE_URL = 'http://localhost:3030';

console.log(plan1);
request
  .post({ url: `${BASE_URL}/api/plan/`, json: true, body: plan1 })
  .then(res => {
    console.log(res);
  });
