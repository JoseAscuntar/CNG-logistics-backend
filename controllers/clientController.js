const db = require("../db/queries.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getAllClients(req, res) {
    const clients = await db.getAllClients();
    res.json(clients);
}

async function getClientById(req, res) {
    const { clientId } = req.params;
    const client = await db.getClientById(Number(clientId));

    if (!client) {
        throw new CustomNotFoundError("Client not found");
    }
    
    res.json(client);
}

module.exports = {
    getAllClients,
    getClientById,
}
