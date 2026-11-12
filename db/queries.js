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

async function getUnitById(id) {
    const { rows } = await pool.query("SELECT * FROM units WHERE id = $1", [id]);
    return rows[0];
}

async function getLegalEntityById(id) {
    const { rows } = await pool.query("SELECT * FROM legal_entities WHERE id = $1", [id]);
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

async function getAllUnits() {
    const { rows } = await pool.query("SELECT * FROM units WHERE active = TRUE");
    return rows;
}

async function getAllLegalEntities() {
    const { rows } = await pool.query("SELECT * FROM legal_entities WHERE active = TRUE");
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

async function insertProduct({ name }) {
    const { rows } = await pool.query(`
        INSERT INTO products (name)
        VALUES ($1)
        RETURNING *;
        `, 
        [name])
    return rows[0];
}

async function insertPresentation({ product_id, amount, unit_id}) {
    const { rows } = await pool.query(`
        INSERT INTO presentations (product_id, amount, unit_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, 
        [product_id, amount, unit_id])
    return rows[0];
}

async function insertContract({ name, legal_entity_id, client_id}) {
    const { rows } = await pool.query(`
        INSERT INTO contracts (name, legal_entity_id, client_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, 
        [name, legal_entity_id, client_id])
    return rows[0];
}

async function insertClient({ name, nit, contact, address, telephone, city, email, replenishment_percentage}) {
    const { rows } = await pool.query(`
        INSERT INTO clients (name, nit, contact, address, telephone, city, email, replenishment_percentage)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `, 
        [name, nit, contact, address, telephone, city, email, replenishment_percentage])
    return rows[0];
}

async function insertUnit({ name }) {
    const { rows } = await pool.query(`
        INSERT INTO units (name)
        VALUES ($1)
        RETURNING *;
        `, 
        [name])
    return rows[0];
}

async function insertLegalEntity({ name, nit }) {
    const { rows } = await pool.query(`
        INSERT INTO legal_entities (name, nit)
        VALUES ($1, $2)
        RETURNING *;
        `, 
        [name, nit])
    return rows[0];
}

module.exports = { 
    getSupplierById, 
    getProductById, 
    getPresentationById, 
    getClientById, 
    getContractById, 
    getUnitById,
    getLegalEntityById,
    getAllSuppliers, 
    getAllProducts, 
    getAllPresentations, 
    getAllClients, 
    getAllContracts,
    getAllUnits,
    getAllLegalEntities,
    insertSupplier,
    insertProduct,
    insertPresentation,
    insertContract,
    insertClient,
    insertUnit,
    insertLegalEntity,
};
