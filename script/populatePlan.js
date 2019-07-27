const app = require('../src/app');
const plan1 = require('../fixture/plan1.json');

(async () => {
  let user1 = await app.service('api/users').get('demo1@example.com');
  console.log(user1);
  app.service('api/plan').create(plan1, { user1 });
})();

const plan2 = require('../fixture/plan2.json');

(async () => {
  let user2 = await app.service('api/users').get('demo2@example.com');
  console.log(user2);
  app.service('api/plan').create(plan2, { user2 });
})();
