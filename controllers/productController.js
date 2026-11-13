const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries/productQueries.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const { BAD_REQUEST, CREATED, OK } = require("../constants/httpStatusCodes.js");
const { INTEGER_MAX } = require("../constants/limits.js");

const getAllProducts = makeGetAll(db.getAllProducts);
const getProductById = makeGetById("product", db.getProductById);

const validateProduct = [
    body("name")
        .isString()
        .withMessage("El nombre del producto debe ser texto")
        .trim()
        .notEmpty()
        .withMessage("Es obligatorio escribir el nombre del producto")
        .isLength({ max: 100 })
        .withMessage(
            "El nombre del producto no puede superar los 100 caracteres",
        ),
];

const createProduct = [
    validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }
        const newProduct = await db.insertProduct(matchedData(req));
        return res.status(CREATED).json(newProduct);
    },
];

const editProduct = [
    validateProduct,
    async (req, res) => {
        const id = Number(req.params.productId);
        if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
            throw new CustomNotFoundError("Product not found");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }

        const updatedProduct = await db.updateProduct(matchedData(req), id);
        if (!updatedProduct) {
            throw new CustomNotFoundError("Product not found");
        }
        return res.status(OK).json(updatedProduct);
    },
];

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
};
