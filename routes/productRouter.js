const { Router } = require("express");
const {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
} = require("../controllers/productController.js");

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/", createProduct);
productRouter.put("/:productId", editProduct);

module.exports = productRouter;
