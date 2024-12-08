require("dotenv").config();

const express = require("express");
const axios = require("axios");
// const session = require("express-session");
// const passport = require("passport");
// const CognitoStrategy = require("passport-cognito");
// const AWS = require("aws-sdk");
const cors = require("cors");
// const bodyParser = require("body-parser");
const multer = require("multer");
const FormData = require("form-data");
const upload = multer();

// const sessionMiddleware = require("./src/middleware/sessionMiddleware");
// const authMiddleware = require("./src/middleware/authMiddleware");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const cartItemRoutes = require("./src/routes/cartItemRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// app.use(sessionMiddleware.session);
// app.use(authMiddleware.authenticate);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/carts", cartRoutes);
app.use("/cart-items", cartItemRoutes);
app.use("/orders", orderRoutes);

app.put("/products/image", upload.single("file"), (req, res) => {
  const formData = new FormData();
  formData.append("file", req.file.buffer, req.file.originalname);
  formData.append("id", req.body.id);

  axios
    .put("http://localhost:8080/products/image", formData, {
      headers: {
        ...formData.getHeaders(), // Ensure correct headers are set
      },
    })
    .then((response) => {
      res.status(200).json(response.data); // Respond back to the frontend
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to add product to cart" });
    });
});

module.exports = app;
