const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");
const CustomConflictError = require("../errors/CustomConflictError.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const { CREATED, BAD_REQUEST, OK } = require("../constants/httpStatusCodes.js");
const { UNIQUE_VIOLATION } = require("../constants/postgresErrorCodes.js");
const { INTEGER_MAX } = require("../constants/limits.js");

const getAllSuppliers = makeGetAll("suppliers");
const getSupplierById = makeGetById("supplier");

const validateSupplier = [
    body("name")
        .isString().withMessage("El nombre del proveedor debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el nombre del proveedor")
        .isLength({ max: 100 }).withMessage("El nombre del proveedor no puede superar los 100 caracteres"),

    body("nit")
        .isString().withMessage("El NIT del proveedor debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el NIT del proveedor")
        .isLength({ max: 20 }).withMessage("El NIT del proveedor no puede superar los 20 caracteres"),

    body("contact")
        .isString().withMessage("El contacto del proveedor debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir un nombre para contactarse con el proveedor")
        .isLength({ max: 100 }).withMessage("El contacto del proveedor no puede superar los 100 caracteres"),

    body("address")
        .isString().withMessage("La dirección del proveedor debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir la dirección del proveedor")
        .isLength({ max: 100 }).withMessage("La dirección del proveedor no puede superar los 100 caracteres"),

    body("city")
        .isString().withMessage("La ciudad del proveedor debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir la ciudad en la que se encuentra el proveedor")
        .isLength({ max: 100 }).withMessage("La ciudad del proveedor no puede superar los 100 caracteres"),

    body("email")
        .isString().withMessage("El correo electrónico del proveedor debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el correo electrónico del proveedor")
        .isLength({ max: 100 }).withMessage("El correo electrónico del proveedor no puede superar los 100 caracteres")
        .isEmail().withMessage("El correo electrónico del proveedor no es válido"),

    body("telephone")
        .optional({ values: "falsy" })
        .isString().withMessage("El teléfono del proveedor debe ser texto")
        .trim()
        .isLength({ max: 20 }).withMessage("El teléfono del proveedor no puede superar los 20 caracteres"),
];

const createSupplier = [validateSupplier, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }
    try {
        const newSupplier = await db.insertSupplier(matchedData(req));
        return res.status(CREATED).json(newSupplier);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            throw new CustomConflictError("Ya existe un proveedor con ese NIT");
        }
        throw err;
    }
}];

const editSupplier = [validateSupplier, async (req, res) => {
    const id = Number(req.params.supplierId);
    if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
        throw new CustomNotFoundError("Supplier not found");
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }

    try {
        const updatedSupplier = await db.updateSupplier(matchedData(req), id);
        if (!updatedSupplier) {
            throw new CustomNotFoundError("Supplier not found");
        }
        return res.status(OK).json(updatedSupplier);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            throw new CustomConflictError("Ya existe un proveedor con ese NIT");
        }
        throw err;
    }
}];


module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    editSupplier
}
