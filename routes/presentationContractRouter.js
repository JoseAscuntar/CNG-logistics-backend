const { Router } = require("express");
const {
    getAllPresentationContracts,
    getPresentationContractById,
    createPresentationContract,
    editPresentationContract,
} = require("../controllers/presentationContractController.js");

const presentationContractRouter = Router();

presentationContractRouter.get("/", getAllPresentationContracts);
presentationContractRouter.get(
    "/:presentationContractId",
    getPresentationContractById,
);
presentationContractRouter.post("/", createPresentationContract);
presentationContractRouter.put(
    "/:presentationContractId",
    editPresentationContract,
);

module.exports = presentationContractRouter;
