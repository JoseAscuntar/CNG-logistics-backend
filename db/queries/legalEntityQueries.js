const pool = require("../pool.js");

async function getLegalEntityById(id) {
    const { rows } = await pool.query("SELECT * FROM legal_entities WHERE id = $1", [id]);
    return rows[0];
}

async function getAllLegalEntities() {
    const { rows } = await pool.query("SELECT * FROM legal_entities WHERE active = TRUE");
    return rows;
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

async function updateLegalEntity({ name, nit }, id) {
    const { rows } = await pool.query(`
        UPDATE legal_entities
        SET (name, nit) = ($1, $2)
        WHERE id = $3
        RETURNING *;
        `, 
        [name, nit, id])
    return rows[0];
}

module.exports = {
    getLegalEntityById,
    getAllLegalEntities,
    insertLegalEntity,
    updateLegalEntity,
}
