const users = require('../fixture/users.json');
const request = require('request-promise');

const BASE_URL = 'http://localhost:3030';

users.forEach(v => {
  console.log(v);
  request
    .post({ url: `${BASE_URL}/api/users/`, json: true, body: v })
    .then(res => {
      console.log(res);
    });
});
