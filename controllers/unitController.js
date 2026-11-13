const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator"); 
const db = require("../db/queries/unitQueries.js");
const CustomConflictError = require("../errors/CustomConflictError.js")
const { BAD_REQUEST, CREATED } = require("../constants/httpStatusCodes.js");
const { UNIQUE_VIOLATION } = require("../constants/postgresErrorCodes.js");

const getAllUnits = makeGetAll(db.getAllUnits);
const getUnitById = makeGetById("unit", db.getUnitById);

const validateUnit = [
    body("name")
        .isString().withMessage("El nombre de la unidad debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el nombre de la unidad")
        .isLength({ max: 10 }).withMessage("El nombre de la unidad no puede superar los 10 caracteres"),
];

const createUnit = [validateUnit, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }
    try {
        const newUnit = await db.insertUnit(matchedData(req));
        return res.status(CREATED).json(newUnit);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            throw new CustomConflictError("Ya existe una unidad con ese nombre");
        }
        throw err;
    }
    
}];

module.exports = {
    getAllUnits,
    getUnitById,
    createUnit,
}
