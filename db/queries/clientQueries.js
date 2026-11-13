const pool = require("../pool.js");

async function getClientById(id) {
    const { rows } = await pool.query("SELECT * FROM clients WHERE id = $1", [id]);
    return rows[0];
}

async function getAllClients() {
    const { rows } = await pool.query("SELECT * FROM clients WHERE active = TRUE");
    return rows;
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

module.exports = {
    getClientById,
    getAllClients,
    insertClient,
}
