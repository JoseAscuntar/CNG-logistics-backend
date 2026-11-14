const { Router } = require("express");
const {
    getAllSupplierPresentations,
    getSupplierPresentationById,
    createSupplierPresentation,
    editSupplierPresentation,
} = require("../controllers/supplierPresentationController.js");

const supplierPresentationRouter = Router();

supplierPresentationRouter.get("/", getAllSupplierPresentations);
supplierPresentationRouter.get(
    "/:supplierPresentationId",
    getSupplierPresentationById,
);
supplierPresentationRouter.post("/", createSupplierPresentation);
supplierPresentationRouter.put(
    "/:supplierPresentationId",
    editSupplierPresentation,
);

module.exports = supplierPresentationRouter;
