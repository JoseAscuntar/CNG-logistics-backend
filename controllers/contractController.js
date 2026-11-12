const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");

const INTEGER_MAX = 2147483647; // Max value an integer can hold on PostgreSQL.

const getAllContracts = makeGetAll("contracts");
const getContractById = makeGetById("contract");

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
        return res.status(400).json(errors.array());
    }
    const newContract = await db.insertContract(matchedData(req));
    return res.status(201).json(newContract);
}];

module.exports = {
    getAllContracts,
    getContractById,
    createContract,
}
