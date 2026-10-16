const { Router } = require("express");
const { getAllProducts, getProductById } = require("../controllers/productController.js");

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProductById);

module.exports = productRouter;
