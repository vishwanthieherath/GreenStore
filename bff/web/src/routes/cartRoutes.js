const express = require("express");
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticate, cartController.getCarts);
router.get("/:id", cartController.getCart);
router.post("/", authenticate, cartController.createCart);

module.exports = router;
