const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator"); 
const db = require("../db/queries.js");

const INTEGER_MAX = 2147483647; // Max value an integer can hold on PostgreSQL.

const getAllPresentations = makeGetAll("presentations");
const getPresentationById = makeGetById("presentation");

const validatePresentation = [
    body("product_id")
        .isInt({ min: 1, max: INTEGER_MAX }).withMessage("Es obligatorio seleccionar un producto válido")
        .toInt(),

    body("amount")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir la cantidad de producto para esta presentación").bail()
        .isInt({ min: 1, max: INTEGER_MAX }).withMessage("La cantidad de producto para esta presentación debe ser válida (un entero positivo)")
        .toInt(),

    body("unit_id")
        .isInt({ min: 1, max: INTEGER_MAX }).withMessage("Es obligatorio seleccionar una unidad válida")
        .toInt(),
];

const createPresentation = [validatePresentation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    const newPresentation = await db.insertPresentation(matchedData(req));
    return res.status(201).json(newPresentation);
}];

module.exports = {
    getAllPresentations,
    getPresentationById,
    createPresentation,
}
