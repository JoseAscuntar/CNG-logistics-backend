const { Router } = require("express");
const { getAllProducts, getProductById, createProduct } = require("../controllers/productController.js");

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/", createProduct);

module.exports = productRouter;
