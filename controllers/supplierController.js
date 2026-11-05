const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");

const getAllSuppliers = makeGetAll("suppliers");
const getSupplierById = makeGetById("supplier");

module.exports = {
    getAllSuppliers,
    getSupplierById,
}
