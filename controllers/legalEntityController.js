const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator"); 
const db = require("../db/queries/legalEntityQueries.js");
const CustomConflictError = require("../errors/CustomConflictError.js")
const { BAD_REQUEST, CREATED } = require("../constants/httpStatusCodes.js");
const { UNIQUE_VIOLATION } = require("../constants/postgresErrorCodes.js");

const getAllLegalEntities = makeGetAll(db.getAllLegalEntities);
const getLegalEntityById = makeGetById("legalEntity", db.getLegalEntityById);

const validateLegalEntity = [
    body("name")
        .isString().withMessage("El nombre de la figura jurídica debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el nombre de la figura jurídica")
        .isLength({ max: 100 }).withMessage("El nombre de la figura jurídica no puede superar los 100 caracteres"),

    body("nit")
        .isString().withMessage("El NIT de la figura jurídica debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el NIT de la figura jurídica")
        .isLength({ max: 20 }).withMessage("El NIT de la figura jurídica no puede superar los 20 caracteres"),
];

const createLegalEntity = [validateLegalEntity, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }
    try {
        const newLegalEntity = await db.insertLegalEntity(matchedData(req));
        return res.status(CREATED).json(newLegalEntity);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            throw new CustomConflictError("Ya existe una figura jurídica con ese NIT");
        }
        throw err;
    }
}];

module.exports = {
    getAllLegalEntities,
    getLegalEntityById,
    createLegalEntity,
}
