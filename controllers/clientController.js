const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");

const getAllClients = makeGetAll("clients");
const getClientById = makeGetById("client");

module.exports = {
    getAllClients,
    getClientById,
}
