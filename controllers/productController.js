const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");

const getAllProducts = makeGetAll("products");
const getProductById = makeGetById("product");

module.exports = {
    getAllProducts,
    getProductById,
}
