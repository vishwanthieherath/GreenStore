module.exports = {
  cognito: {
    region: process.env.AWS_REGION,
    userPoolId: process.env.USER_POOL_ID,
    clientId: process.env.CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
    domain: process.env.COGNITO_DOMAIN,
    jwksUri: process.env.JWKS_URI,
  },
};
