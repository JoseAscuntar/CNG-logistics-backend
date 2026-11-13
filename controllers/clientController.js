const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries/clientQueries.js");
const CustomConflictError = require("../errors/CustomConflictError.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const { BAD_REQUEST, CREATED, OK } = require("../constants/httpStatusCodes.js");
const { UNIQUE_VIOLATION } = require("../constants/postgresErrorCodes.js");
const { INTEGER_MAX } = require("../constants/limits.js");

const getAllClients = makeGetAll(db.getAllClients);
const getClientById = makeGetById("client", db.getClientById);

const validateClient = [
    body("name")
        .isString().withMessage("El nombre del cliente debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el nombre del cliente")
        .isLength({ max: 100 }).withMessage("El nombre del cliente no puede superar los 100 caracteres"),

    body("nit")
        .isString().withMessage("El NIT del cliente debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el NIT del cliente")
        .isLength({ max: 20 }).withMessage("El NIT del cliente no puede superar los 20 caracteres"),

    body("contact")
        .isString().withMessage("El contacto del cliente debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir un nombre para contactarse con el cliente")
        .isLength({ max: 100 }).withMessage("El contacto del cliente no puede superar los 100 caracteres"),

    body("address")
        .isString().withMessage("La dirección del cliente debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir la dirección del cliente")
        .isLength({ max: 100 }).withMessage("La dirección del cliente no puede superar los 100 caracteres"),

    body("city")
        .isString().withMessage("La ciudad del cliente debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir la ciudad en la que se encuentra el cliente")
        .isLength({ max: 100 }).withMessage("La ciudad del cliente no puede superar los 100 caracteres"),

    body("email")
        .isString().withMessage("El correo electrónico del cliente debe ser texto")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el correo electrónico del cliente")
        .isLength({ max: 100 }).withMessage("El correo electrónico del cliente no puede superar los 100 caracteres")
        .isEmail().withMessage("El correo electrónico del cliente no es válido"),

    body("telephone")
        .optional({ values: "falsy" })
        .isString().withMessage("El teléfono del cliente debe ser texto")
        .trim()
        .isLength({ max: 20 }).withMessage("El teléfono del cliente no puede superar los 20 caracteres"),

    body("replenishment_percentage")
        .trim()
        .notEmpty().withMessage("Es obligatorio escribir el porcentaje de reposición utilizado para este cliente").bail()
        .isFloat({ gt: 0 }).withMessage('El porcentaje de reposición debe ser válido (un número positivo)')
        .isFloat({ max: 100 }).withMessage('El porcentaje de reposición debe ser menor a 100')
        .toFloat()
];


const createClient = [validateClient, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }
    try {
        const newClient = await db.insertClient(matchedData(req));
        return res.status(CREATED).json(newClient);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            throw new CustomConflictError("Ya existe un cliente con ese NIT");
        }
        throw err;
    }
}];

const editClient = [validateClient, async (req, res) => {
    const id = Number(req.params.clientId);
    if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
        throw new CustomNotFoundError("Client not found");
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json(errors.array());
    }

    try {
        const updatedClient = await db.updateClient(matchedData(req), id);
        if (!updatedClient) {
            throw new CustomNotFoundError("Client not found");
        }
        return res.status(OK).json(updatedClient);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            throw new CustomConflictError("Ya existe un cliente con ese NIT");
        }
        throw err;
    }
}];

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    editClient,
}
