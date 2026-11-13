const { Router } = require("express");
const { getAllLegalEntities, getLegalEntityById, createLegalEntity, editLegalEntity } = require("../controllers/legalEntityController.js");

const legalEntityRouter = Router();

legalEntityRouter.get("/", getAllLegalEntities);
legalEntityRouter.get("/:legalEntityId", getLegalEntityById);
legalEntityRouter.post("/", createLegalEntity);
legalEntityRouter.put("/:legalEntityId", editLegalEntity);

module.exports = legalEntityRouter;
