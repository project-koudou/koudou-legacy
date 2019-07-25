module.exports = function() {
  return async context => {
    const secret = context.app.get('authentication').secret;
    let payload = await context.app.passport.verifyJWT(
      context.params.accessToken,
      { secret }
    );
    // console.log(payload.operatorToken === context.app.get('authentication').operatorToken);
    return (
      payload.operatorToken === context.app.get('authentication').operatorToken
    );
  };
};
