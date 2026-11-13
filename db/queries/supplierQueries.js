const pool = require("../pool.js");

async function getSupplierById(id) {
    const { rows } = await pool.query("SELECT * FROM suppliers WHERE id = $1", [id]);
    return rows[0]; // Using the [0] so that !supplier in the supplier controller is true if the id is missing and the 404 message is actually sent
}

async function getAllSuppliers() {
    const { rows } = await pool.query("SELECT * FROM suppliers WHERE active = TRUE");
    return rows;
}

async function insertSupplier({ name, nit, contact, address, telephone, city, email }) {
    const { rows } = await pool.query(`
        INSERT INTO suppliers (name, nit, contact, address, telephone, city, email)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `, 
        [name, nit, contact, address, telephone, city, email])
    return rows[0];
}

async function updateSupplier({ name, nit, contact, address, telephone, city, email}, id) {
    const { rows } = await pool.query(`
        UPDATE suppliers 
        SET (name, nit, contact, address, telephone, city, email) = ($1, $2, $3, $4, $5, $6, $7)
        WHERE id = $8
        RETURNING *;
        `, 
        [name, nit, contact, address, telephone, city, email, id])
    return rows[0];
}

module.exports = {
    getSupplierById,
    getAllSuppliers,
    insertSupplier,
    updateSupplier,
}
