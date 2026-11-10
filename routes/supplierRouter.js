const { Router } = require("express");
const { getAllSuppliers, getSupplierById, createSupplier } = require("../controllers/supplierController.js");

const supplierRouter = Router();

supplierRouter.get("/", getAllSuppliers);
supplierRouter.get("/:supplierId", getSupplierById);
supplierRouter.post("/", createSupplier);

module.exports = supplierRouter;
