const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator"); 
const db = require("../db/queries/presentationQueries.js");
const CustomBadRequestError = require("../errors/CustomBadRequestError.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const { INTEGER_MAX } = require("../constants/limits.js");
const { BAD_REQUEST, CREATED, OK } = require("../constants/httpStatusCodes.js");
const { FOREIGN_KEY_VIOLATION } = require("../constants/postgresErrorCodes.js");

const getAllPresentations = makeGetAll(db.getAllPresentations);
const getPresentationById = makeGetById("presentation", db.getPresentationById);

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
        return res.status(BAD_REQUEST).json(errors.array());
    }
    try {
        const newPresentation = await db.insertPresentation(matchedData(req));
        return res.status(CREATED).json(newPresentation);
    } catch (err) {
        if (err.code === FOREIGN_KEY_VIOLATION) {
            if (err.constraint === "presentations_to_product") {
                throw new CustomBadRequestError("El producto seleccionado no existe");
            } else if (err.constraint === "presentations_to_unit") {
                throw new CustomBadRequestError("La unidad seleccionada no existe");
            }
        }
        throw err;
    }
}];

const editPresentation = [validatePresentation, async (req, res) => {
    const id = Number(req.params.presentationId);
    if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
        throw new CustomNotFoundError("Presentation not found");
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }

    try {
        const updatedPresentation = await db.updatePresentation(matchedData(req), id);
        if (!updatedPresentation) {
            throw new CustomNotFoundError("Presentation not found");
        }
        return res.status(OK).json(updatedPresentation);
    } catch (err) {
        if (err.code === FOREIGN_KEY_VIOLATION) {
            if (err.constraint === "presentations_to_product") {
                throw new CustomBadRequestError("El producto seleccionado no existe");
            } else if (err.constraint === "presentations_to_unit") {
                throw new CustomBadRequestError("La unidad seleccionada no existe");
            }
        }
        throw err;
    }
}];

module.exports = {
    getAllPresentations,
    getPresentationById,
    createPresentation,
    editPresentation,
}
