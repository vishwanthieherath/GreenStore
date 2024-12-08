const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);
router.get("/category/:id", productController.getProductsByCategory);

module.exports = router;
