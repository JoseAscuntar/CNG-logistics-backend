const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries/contractQueries.js");
const CustomBadRequestError = require("../errors/CustomBadRequestError.js");
const { BAD_REQUEST, CREATED } = require("../constants/httpStatusCodes.js");
const { FOREIGN_KEY_VIOLATION } = require("../constants/postgresErrorCodes.js");
const { INTEGER_MAX } = require("../constants/limits.js");

const getAllContracts = makeGetAll(db.getAllContracts);
const getContractById = makeGetById("contract", db.getContractById);

const validateContract = [
    body("name")
        .isString().withMessage("El nombre del contrato debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el nombre del contrato")
        .isLength({ max: 100 }).withMessage("El nombre del contrato no puede superar los 100 caracteres"),

    body("legal_entity_id")
        .isInt({ min: 1, max: INTEGER_MAX }).withMessage("Es obligatorio seleccionar una entidad legal válida")
        .toInt(),

    body("client_id")
        .isInt({ min: 1, max: INTEGER_MAX }).withMessage("Es obligatorio seleccionar un cliente válido")
        .toInt(),
];

const createContract = [validateContract, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }
    try {
        const newContract = await db.insertContract(matchedData(req));
        return res.status(CREATED).json(newContract);
    } catch (err) {
        if (err.code === FOREIGN_KEY_VIOLATION) {
            if (err.constraint === "contracts_to_legal_entity") {
                throw new CustomBadRequestError("La entidad legal seleccionada no existe");
            } else if (err.constraint === "contracts_to_client") {
                throw new CustomBadRequestError("El cliente seleccionado no existe");
            }
        }
        throw err;
    }
}];

module.exports = {
    getAllContracts,
    getContractById,
    createContract,
}
