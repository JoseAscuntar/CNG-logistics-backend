const { Router } = require("express");
const {
    getAllUnits,
    getUnitById,
    createUnit,
    editUnit,
} = require("../controllers/unitController.js");

const unitRouter = Router();

unitRouter.get("/", getAllUnits);
unitRouter.get("/:unitId", getUnitById);
unitRouter.post("/", createUnit);
unitRouter.put("/:unitId", editUnit);

module.exports = unitRouter;
