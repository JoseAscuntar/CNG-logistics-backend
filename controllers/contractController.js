const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");

const getAllContracts = makeGetAll("contracts");
const getContractById = makeGetById("contract");

module.exports = {
    getAllContracts,
    getContractById,
}
