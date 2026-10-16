const { Router } = require("express");
const { getAllClients, getClientById } = require("../controllers/clientController.js");

const clientRouter = Router();

clientRouter.get("/", getAllClients);
clientRouter.get("/:clientId", getClientById);

module.exports = clientRouter;
