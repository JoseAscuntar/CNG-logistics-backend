const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");
const CustomConflictError = require("../errors/CustomConflictError.js");

const getAllSuppliers = makeGetAll("suppliers");
const getSupplierById = makeGetById("supplier");

const validateSupplier = [
    body("name")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el nombre del proveedor")
        .isLength({ max: 100 }).withMessage("El nombre del proveedor no puede superar los 100 caracteres"),

    body("nit")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el NIT del proveedor")
        .isLength({ max: 20 }).withMessage("El NIT del proveedor no puede superar los 20 caracteres"),

    body("contact")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir un nombre para contactarse con el proveedor")
        .isLength({ max: 100 }).withMessage("El contacto del proveedor no puede superar los 100 caracteres"),

    body("address")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir la dirección del proveedor")
        .isLength({ max: 100 }).withMessage("La dirección del proveedor no puede superar los 100 caracteres"),

    body("city")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir la ciudad en la que se encuentra el proveedor")
        .isLength({ max: 100 }).withMessage("La ciudad del proveedor no puede superar los 100 caracteres"),

    body("email")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el correo electrónico del proveedor")
        .isLength({ max: 100 }).withMessage("El correo electrónico del proveedor no puede superar los 100 caracteres")
        .isEmail().withMessage("El correo electrónico del proveedor no es válido"),

    body("telephone")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 20 }).withMessage("El teléfono del proveedor no puede superar los 20 caracteres"),
];

const createSupplier = [validateSupplier, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    try {
        const newSupplier = await db.insertSupplier(matchedData(req));
        return res.status(201).json(newSupplier);
    } catch (err) {
        if (err.code === "23505") {
            throw new CustomConflictError("Ya existe un proveedor con ese NIT");
        }
        throw err;
    }
}];


module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier
}
