const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const config = require("../config/cognitoConfig");

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

AWS.config.update({
  region: config.cognito.region,
});


const verifyToken = async (token) => {

  const params = {
    AccessToken: token,
  };

  const decodedToken = jwt.decode(token, { complete: true });
  // console.log("Decoded token:", decodedToken);

  try {
    const user = await cognitoIdentityServiceProvider.getUser(params).promise();
    // console.log("User info:", user);

    const username = user.Username;

    console.log("Username:", username);

    return { username };

  } catch (error) {
    console.error("Error fetching user:", error);
  }
};


const authenticate = (req, res, next) => {

    // console.log(req.headers);
  const token = req.headers.authorization?.split(" ")[1];

  // console.log(token);

  if (!token) {
    // console.log('no token');
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token using Cognito or another authentication service
  verifyToken(token)
    .then((user) => {
      req.user = user; // Attach user data to the request
      // console.log("email", user.email);
      next(); // Proceed to the next middleware or route handler
    })
    .catch((err) => {
      console.error("Token validation error:", err);
      res.status(401).json({ message: "Invalid token" });
    });

};


module.exports = {
    authenticate,
    verifyToken,
};
