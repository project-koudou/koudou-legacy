const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');

module.exports = function(app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('api/authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),
        async context => {
          let operatorToken = null;
          if (context.data.strategy === 'jwt') {
            const secret = context.app.get('authentication').secret;
            let payload = await context.app.passport.verifyJWT(
              context.data.accessToken,
              { secret }
            );
            operatorToken = payload.operatorToken;
          } else {
            operatorToken = context.data.operatorToken;
          }
          if (operatorToken) {
            context.params.payload = context.params.payload || {};
            Object.assign(context.params.payload, {
              operatorToken: operatorToken
            });
          }
        }
      ],
      remove: [authentication.hooks.authenticate('jwt')]
    }
  });
};
