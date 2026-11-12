const { Router } = require("express");
const { getAllClients, getClientById, createClient } = require("../controllers/clientController.js");

const clientRouter = Router();

clientRouter.get("/", getAllClients);
clientRouter.get("/:clientId", getClientById);
clientRouter.post("/", createClient);

module.exports = clientRouter;
