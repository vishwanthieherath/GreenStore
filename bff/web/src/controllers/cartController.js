const cartService = require("../services/cartService");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.params.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.getCarts = async (req, res, next) => {

  try {
    const response = await cartService.getCarts(req);
    // console.log(response);
    res.json(response);
    // console.log(res);
  } catch (error) {
    next(error);
  }
};

exports.createCart = async (req, res, next) => {

  try {
    const newCart = await cartService.createCart(req);
    console.log(newCart);
    res.status(201).json(newCart);
    return newCart;
  } catch (error) {
    next(error);
  }
};
