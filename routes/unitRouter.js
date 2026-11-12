const { Router } = require("express");
const { getAllUnits, getUnitById, createUnit } = require("../controllers/unitController.js");

const unitRouter = Router();

unitRouter.get("/", getAllUnits);
unitRouter.get("/:unitId", getUnitById);
unitRouter.post("/", createUnit);

module.exports = unitRouter;
