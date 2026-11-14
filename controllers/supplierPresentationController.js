const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries/supplierPresentationQueries.js");
const CustomConflictError = require("../errors/CustomConflictError.js");
const CustomBadRequestError = require("../errors/CustomBadRequestError.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const { BAD_REQUEST, CREATED, OK } = require("../constants/httpStatusCodes.js");
const { INTEGER_MAX } = require("../constants/limits.js");
const {
    UNIQUE_VIOLATION,
    FOREIGN_KEY_VIOLATION,
} = require("../constants/postgresErrorCodes.js");

const getAllSupplierPresentations = makeGetAll(db.getAllSupplierPresentations);
const getSupplierPresentationById = makeGetById(
    "supplierPresentation",
    db.getSupplierPresentationById,
);

const validateSupplierPresentationCreate = [
    body("supplier_id")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar un proveedor válido")
        .toInt(),

    body("presentation_id")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar una presentación válida")
        .toInt(),

    body("buying_price")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar un precio de compra")
        .toInt(),
];

const createSupplierPresentation = [
    validateSupplierPresentationCreate,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }
        try {
            const newSupplierPresentation = await db.insertSupplierPresentation(
                matchedData(req),
            );
            return res.status(CREATED).json(newSupplierPresentation);
        } catch (err) {
            if (err.code === FOREIGN_KEY_VIOLATION) {
                if (err.constraint === "supplier_presentations_to_supplier") {
                    throw new CustomBadRequestError(
                        "El proveedor seleccionado no existe",
                    );
                } else if (
                    err.constraint === "supplier_presentations_to_presentation"
                ) {
                    throw new CustomBadRequestError(
                        "La presentación seleccionada no existe",
                    );
                }
            } else if (err.code === UNIQUE_VIOLATION) {
                throw new CustomConflictError(
                    "Ya existe un valor para el precio de compra de este proveedor para esta presentación",
                );
            }
            throw err;
        }
    },
];

const validateSupplierPresentationEdit = [
    body("buying_price")
        .isInt({ min: 1, max: INTEGER_MAX })
        .withMessage("Es obligatorio seleccionar un precio de compra")
        .toInt(),
];

const editSupplierPresentation = [
    validateSupplierPresentationEdit,
    async (req, res) => {
        const id = Number(req.params.supplierPresentationId);
        if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
            throw new CustomNotFoundError("Supplier-Presentation not found");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json(errors.array());
        }

        const updatedSupplierPresentation = await db.updateSupplierPresentation(
            matchedData(req),
            id,
        );
        if (!updatedSupplierPresentation) {
            throw new CustomNotFoundError("Supplier-Presentation not found");
        }
        return res.status(OK).json(updatedSupplierPresentation);
    },
];

module.exports = {
    getAllSupplierPresentations,
    getSupplierPresentationById,
    createSupplierPresentation,
    editSupplierPresentation,
};
