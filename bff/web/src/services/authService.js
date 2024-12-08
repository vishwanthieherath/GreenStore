const {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} = require("amazon-cognito-identity-js");
const cognitoConfig = require("../config/cognitoConfig");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const poolData = {
  UserPoolId: cognitoConfig.cognito.userPoolId,
  ClientId: cognitoConfig.cognito.clientId,
};

const userPool = new CognitoUserPool(poolData);

exports.signUp = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        logger.error(err);
        return reject(err);
      }
      console.log(data);
      resolve(data);
    });
  });
};

exports.authenticate = async ({ email, password }) => {

  return await new Promise ((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        logger.info("onSuccess", result);
        resolve(result);
      },
      onFailure: (error) => {
        logger.error("onFailure", error);
        reject(error);
      },
      newPasswordRequired: (data) => {
        logger.log("newPasswordRequired", data);
        resolve(data);
      },
    });
  });
};

exports.getSession = async () => {

  return await new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject(err);
        }

        const token = session.getIdToken().getJwtToken();
        const decodedToken = jwt.decode(token);
        console.log("Decoded token:", decodedToken);

        const groups = decodedToken["cognito:groups"] || [];
        console.log(groups);
        const isAdmin = groups.includes("admin");

        if (isAdmin) {
          console.log("User is an admin");
        } else {
          console.log("User is not an admin");
        }

        resolve({ session, isAdmin });
        return { session, isAdmin };

      });
    } else {
      reject("No user found");
    }
  });
};

exports.logOut = async (redirectUrl) => {
  return new Promise((resolve, reject) => {
    try {
      const result = { redirectUrl: redirectUrl || "/products" };
      resolve(result);
      console.log(result.redirectUrl);
    } catch (error) {
      reject(error);
    }
  });
};
