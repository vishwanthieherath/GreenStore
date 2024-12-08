const authService = require("../services/authService");

exports.signUp = async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const newUser = await authService.signUp({ email, password });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const cognitoUser = await authService.authenticate({ email, password });
    res.json(cognitoUser);
    req.authResult = cognitoUser;
    next();
  } catch (error) {
    next(error);
    next(error);
  }
};

exports.getSession = async (req, res, next) => {

  try {
    const sessionData = await authService.getSession(req.authResult);
    res.status(200).json({
      success: true,
      data: sessionData,
      message: "Session data retrieved successfully",
    });
    return sessionData;
  } catch (error) {
    next(error);
  }
};


exports.logOut = async (req, res, next) => {
  try {
    const redirectUrl = req.query.redirectUrl || "/products";
    const result = await authService.logOut(redirectUrl);
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
