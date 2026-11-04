const db = require("../db/queries.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getAllClients(req, res) {
    const clients = await db.getAllClients();
    res.json(clients);
}

async function getClientById(req, res) {
    const { clientId } = req.params;
    const id = Number(clientId);
    if (!Number.isInteger(id) || id <= 0) {
        throw new CustomNotFoundError("Client not found");
    }

    const client = await db.getClientById(id);
    if (!client) {
        throw new CustomNotFoundError("Client not found");
    }
    
    res.json(client);
}

module.exports = {
    getAllClients,
    getClientById,
}
