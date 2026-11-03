const db = require("../db/queries.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getAllSuppliers(req, res) {
    const suppliers = await db.getAllSuppliers();
    res.json(suppliers);
}

async function getSupplierById(req, res) {
    const { supplierId } = req.params;
    const id = Number(supplierId);
    if (!Number.isInteger(id) || id <= 0) {
        throw new CustomNotFoundError("Supplier not found");
    }

    const supplier = await db.getSupplierById(id);
    if (!supplier) {
        throw new CustomNotFoundError("Supplier not found");
    }
    
    res.json(supplier);
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
}
