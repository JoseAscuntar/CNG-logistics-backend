const { Router } = require("express");
const {
    getAllContracts,
    getContractById,
    createContract,
    editContract,
} = require("../controllers/contractController");

const contractRouter = Router();

contractRouter.get("/", getAllContracts);
contractRouter.get("/:contractId", getContractById);
contractRouter.post("/", createContract);
contractRouter.put("/:contractId", editContract);

module.exports = contractRouter;
