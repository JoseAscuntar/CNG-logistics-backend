const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries/unitQueries.js");
const CustomConflictError = require("../errors/CustomConflictError.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const { BAD_REQUEST, CREATED, OK } = require("../constants/httpStatusCodes.js");
const { UNIQUE_VIOLATION } = require("../constants/postgresErrorCodes.js");
const { INTEGER_MAX } = require("../constants/limits.js");

const getAllUnits = makeGetAll(db.getAllUnits);
const getUnitById = makeGetById("unit", db.getUnitById);

const validateUnit = [
    body("name")
        .isString()
        .withMessage("El nombre de la unidad debe ser texto")
        .trim()
        .notEmpty()
        .withMessage("Es obligatorio escribir el nombre de la unidad")
        .isLength({ max: 10 })
        .withMessage(
            "El nombre de la unidad no puede superar los 10 caracteres",
        ),
];

const createUnit = [
    validateUnit,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }
        try {
            const newUnit = await db.insertUnit(matchedData(req));
            return res.status(CREATED).json(newUnit);
        } catch (err) {
            if (err.code === UNIQUE_VIOLATION) {
                throw new CustomConflictError(
                    "Ya existe una unidad con ese nombre",
                );
            }
            throw err;
        }
    },
];

const editUnit = [
    validateUnit,
    async (req, res) => {
        const id = Number(req.params.unitId);
        if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
            throw new CustomNotFoundError("Unit not found");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }

        try {
            const updatedUnit = await db.updateUnit(matchedData(req), id);
            if (!updatedUnit) {
                throw new CustomNotFoundError("Unit not found");
            }
            return res.status(OK).json(updatedUnit);
        } catch (err) {
            if (err.code === UNIQUE_VIOLATION) {
                throw new CustomConflictError(
                    "Ya existe una unidad con este nombre",
                );
            }
            throw err;
        }
    },
];

module.exports = {
    getAllUnits,
    getUnitById,
    createUnit,
    editUnit,
};
