const pool = require("../pool.js");

async function getContractById(id) {
    const { rows } = await pool.query("SELECT * FROM contracts WHERE id = $1", [
        id,
    ]);
    return rows[0];
}

async function getAllContracts() {
    const { rows } = await pool.query(
        "SELECT * FROM contracts WHERE active = TRUE",
    );
    return rows;
}

async function insertContract({ name, legal_entity_id, client_id }) {
    const { rows } = await pool.query(
        `
        INSERT INTO contracts (name, legal_entity_id, client_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [name, legal_entity_id, client_id],
    );
    return rows[0];
}

async function updateContract({ name, legal_entity_id, client_id }, id) {
    const { rows } = await pool.query(
        `
        UPDATE contracts
        SET (name, legal_entity_id, client_id) = ($1, $2, $3)
        WHERE id = $4
        RETURNING *;
        `,
        [name, legal_entity_id, client_id, id],
    );
    return rows[0];
}

module.exports = {
    getContractById,
    getAllContracts,
    insertContract,
    updateContract,
};
