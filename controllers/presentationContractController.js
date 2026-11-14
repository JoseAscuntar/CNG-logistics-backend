const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries/presentationContractQueries.js");
const CustomConflictError = require("../errors/CustomConflictError.js");
const CustomBadRequestError = require("../errors/CustomBadRequestError.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const { BAD_REQUEST, CREATED, OK } = require("../constants/httpStatusCodes.js");
const { INTEGER_MAX } = require("../constants/limits.js");
const {
    UNIQUE_VIOLATION,
    FOREIGN_KEY_VIOLATION,
} = require("../constants/postgresErrorCodes.js");

const getAllPresentationContracts = makeGetAll(db.getAllPresentationContracts);
const getPresentationContractById = makeGetById(
    "presentationContract",
    db.getPresentationContractById,
);

const validatePresentationContractCreate = [
    body("presentation_id")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar una presentación válida")
        .toInt(),

    body("contract_id")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar un contrato válido")
        .toInt(),

    body("selling_price")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar un precio de venta")
        .toInt(),
];

const createPresentationContract = [
    validatePresentationContractCreate,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }
        try {
            const newPresentationContract = await db.insertPresentationContract(
                matchedData(req),
            );
            return res.status(CREATED).json(newPresentationContract);
        } catch (err) {
            if (err.code === FOREIGN_KEY_VIOLATION) {
                if (
                    err.constraint === "presentation_contracts_to_presentation"
                ) {
                    throw new CustomBadRequestError(
                        "La presentación seleccionada no existe",
                    );
                } else if (
                    err.constraint === "presentation_contracts_to_contract"
                ) {
                    throw new CustomBadRequestError(
                        "El contrato seleccionado no existe",
                    );
                }
            } else if (err.code === UNIQUE_VIOLATION) {
                throw new CustomConflictError(
                    "Ya existe un valor para el precio de venta de esta presentación en este contrato",
                );
            }
            throw err;
        }
    },
];

const validatePresentationContractEdit = [
    body("selling_price")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar un precio de venta")
        .toInt(),
];

const editPresentationContract = [
    validatePresentationContractEdit,
    async (req, res) => {
        const id = Number(req.params.presentationContractId);
        if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
            throw new CustomNotFoundError("Presentation-Contract not found");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }

        const updatedPresentationContract = await db.updatePresentationContract(
            matchedData(req),
            id,
        );
        if (!updatedPresentationContract) {
            throw new CustomNotFoundError("Presentation-Contract not found");
        }
        return res.status(OK).json(updatedPresentationContract);
    },
];

module.exports = {
    getAllPresentationContracts,
    getPresentationContractById,
    createPresentationContract,
    editPresentationContract,
};
