const { Router } = require("express");
const { getAllSuppliers, getSupplierById } = require("../controllers/supplierController.js");

const supplierRouter = Router();

supplierRouter.get("/", getAllSuppliers);
supplierRouter.get("/:supplierId", getSupplierById);

module.exports = supplierRouter;
