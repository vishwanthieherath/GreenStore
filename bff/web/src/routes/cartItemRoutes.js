const express = require("express");
const cartItemController = require("../controllers/cartItemController");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", cartItemController.getCartItemsByCartId, productController.getProductByCartItem);
// router.get("/:itemId", cartItemController.getCartItem);
router.post("/", cartItemController.addCartItem);
router.delete("/:cartId/:id", cartItemController.deleteCartItemByCartId);

module.exports = router;
