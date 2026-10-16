const { Router } = require("express");
const { getAllContracts, getContractById } = require("../controllers/contractController");

const contractRouter = Router();

contractRouter.get("/", getAllContracts);
contractRouter.get("/:contractId", getContractById);

module.exports = contractRouter;
