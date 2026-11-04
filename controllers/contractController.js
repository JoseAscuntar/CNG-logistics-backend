const db = require("../db/queries.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getAllContracts(req, res) {
    const contracts = await db.getAllContracts();
    res.json(contracts);
}

async function getContractById(req, res) {
    const { contractId } = req.params;
    const id = Number(contractId);
    if (!Number.isInteger(id) || id <= 0) {
        throw new CustomNotFoundError("Contract not found");
    }

    const contract = await db.getContractById(id);
    if (!contract) {
        throw new CustomNotFoundError("Contract not found");
    }
    
    res.json(contract);
}

module.exports = {
    getAllContracts,
    getContractById,
}
