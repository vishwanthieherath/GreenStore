const productService = require('../services/productService');

exports.getProduct = async (req, res, next) => {
    try {
      const product = await productService.getProduct(req.params.id);
      res.json(product);
    } catch (error) {
      next(error);
    }
};

exports.getProductByCartItem = async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const products = await productService.getProductsByCategory(req.params.id);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

