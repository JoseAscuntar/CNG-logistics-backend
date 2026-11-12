const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator"); 
const db = require("../db/queries.js");
const { BAD_REQUEST, CREATED } = require("../constants/httpStatusCodes.js");

const getAllProducts = makeGetAll("products");
const getProductById = makeGetById("product");

const validateProduct = [
    body("name")
        .isString().withMessage("El nombre del producto debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el nombre del producto")
        .isLength({ max: 100 }).withMessage("El nombre del producto no puede superar los 100 caracteres"),
];

const createProduct = [validateProduct, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }
    const newProduct = await db.insertProduct(matchedData(req));
    return res.status(CREATED).json(newProduct);
}];

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
}
