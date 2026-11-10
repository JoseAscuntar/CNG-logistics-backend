const pool = require("./pool.js");

async function getSupplierById(id) {
    const { rows } = await pool.query("SELECT * FROM suppliers WHERE id = $1", [id]);
    return rows[0]; // Using the [0] so that !supplier in the supplier controller is true if the id is missing and the 404 message is actually sent
}

async function getProductById(id) {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return rows[0];
}

async function getPresentationById(id) {
    const { rows } = await pool.query("SELECT * FROM presentations WHERE id = $1", [id]);
    return rows[0];
}

async function getClientById(id) {
    const { rows } = await pool.query("SELECT * FROM clients WHERE id = $1", [id]);
    return rows[0];
}

async function getContractById(id) {
    const { rows } = await pool.query("SELECT * FROM contracts WHERE id = $1", [id]);
    return rows[0];
}

async function getAllSuppliers() {
    const { rows } = await pool.query("SELECT * FROM suppliers WHERE active = TRUE");
    return rows;
}

async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM products WHERE active = TRUE");
    return rows;
}

async function getAllPresentations() {
    const { rows } = await pool.query("SELECT * FROM presentations WHERE active = TRUE");
    return rows;
}

async function getAllClients() {
    const { rows } = await pool.query("SELECT * FROM clients WHERE active = TRUE");
    return rows;
}

async function getAllContracts() {
    const { rows } = await pool.query("SELECT * FROM contracts WHERE active = TRUE");
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

module.exports = { 
    getSupplierById, 
    getProductById, 
    getPresentationById, 
    getClientById, 
    getContractById, 
    getAllSuppliers, 
    getAllProducts, 
    getAllPresentations, 
    getAllClients, 
    getAllContracts,
    insertSupplier
};
