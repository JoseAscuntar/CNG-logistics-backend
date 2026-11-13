const { Router } = require("express");
const {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    editSupplier,
} = require("../controllers/supplierController.js");

const supplierRouter = Router();

supplierRouter.get("/", getAllSuppliers);
supplierRouter.get("/:supplierId", getSupplierById);
supplierRouter.post("/", createSupplier);
supplierRouter.put("/:supplierId", editSupplier);

module.exports = supplierRouter;
