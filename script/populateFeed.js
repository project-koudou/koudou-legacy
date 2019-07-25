const app = require('../src/app');
const data = require('../fixture/feed.json');

data.forEach(v => {
  console.log(v);
  app.service('api/feed').create(v);
});
