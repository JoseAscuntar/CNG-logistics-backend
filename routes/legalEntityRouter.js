const { Router } = require("express");
const { getAllLegalEntities, getLegalEntityById, createLegalEntity } = require("../controllers/legalEntityController.js");

const legalEntityRouter = Router();

legalEntityRouter.get("/", getAllLegalEntities);
legalEntityRouter.get("/:legalEntityId", getLegalEntityById);
legalEntityRouter.post("/", createLegalEntity);

module.exports = legalEntityRouter;
