const plan1 = require('../fixture/plan1.json');
const request = require('request-promise');

const BASE_URL = 'http://localhost:3030';

(async function() {
  let resp = await request.post({
    url: `${BASE_URL}/api/authentication`,
    json: true,
    body: { strategy: 'local', email: 'demo1@example.com', password: 'demo1' }
  });
  let token = resp.accessToken;
  // console.log(token);
  console.log(plan1);
  resp = await request.post({
    url: `${BASE_URL}/api/plan/`,
    headers: { 'Authorization': token },
    json: true,
    body: plan1,
  });
  console.log(resp);
})();
