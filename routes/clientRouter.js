const { Router } = require("express");
const {
    getAllClients,
    getClientById,
    createClient,
    editClient,
} = require("../controllers/clientController.js");

const clientRouter = Router();

clientRouter.get("/", getAllClients);
clientRouter.get("/:clientId", getClientById);
clientRouter.post("/", createClient);
clientRouter.put("/:clientId", editClient);

module.exports = clientRouter;
