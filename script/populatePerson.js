const users = require('../fixture/person.json');
const request = require('request-promise');

const BASE_URL = 'http://localhost:3030';

users.forEach(v => {
  console.log(v);
  request
    .post({ url: `${BASE_URL}/api/person/`, json: true, body: v })
    .then(res => {
      console.log(res);
    });
});
