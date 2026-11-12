const { Router } = require("express");
const { getAllContracts, getContractById, createContract } = require("../controllers/contractController");

const contractRouter = Router();

contractRouter.get("/", getAllContracts);
contractRouter.get("/:contractId", getContractById);
contractRouter.post("/", createContract)

module.exports = contractRouter;
