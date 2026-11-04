const db = require("../db/queries.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getAllProducts(req, res) {
    const products = await db.getAllProducts();
    res.json(products);
}

async function getProductById(req, res) {
    const { productId } = req.params;
    const id = Number(productId);
    if (!Number.isInteger(id) || id <= 0) {
        throw new CustomNotFoundError("Product not found");
    }

    const product = await db.getProductById(id);
    if (!product) {
        throw new CustomNotFoundError("Product not found");
    }
    
    res.json(product);
}

module.exports = {
    getAllProducts,
    getProductById,
}
