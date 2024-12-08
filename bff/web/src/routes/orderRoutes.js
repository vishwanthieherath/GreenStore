const express = require("express");
const orderController = require("../controllers/orderController");
const { payment, complete } = require("../middleware/paymentMiddleware");
const router = express.Router();

// router.get("/", orderController.getOrders);
// router.get("/:id", orderController.getOrder);
// router.post("/", payment, orderController.createOrder);
router.post("/", payment);
router.get("/success", complete, orderController.createOrder);

module.exports = router;
