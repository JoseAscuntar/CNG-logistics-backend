const pool = require("../pool.js");

async function getUnitById(id) {
    const { rows } = await pool.query("SELECT * FROM units WHERE id = $1", [
        id,
    ]);
    return rows[0];
}

async function getAllUnits() {
    const { rows } = await pool.query(
        "SELECT * FROM units WHERE active = TRUE",
    );
    return rows;
}

async function insertUnit({ name }) {
    const { rows } = await pool.query(
        `
        INSERT INTO units (name)
        VALUES ($1)
        RETURNING *;
        `,
        [name],
    );
    return rows[0];
}

async function updateUnit({ name }, id) {
    const { rows } = await pool.query(
        `
        UPDATE units 
        SET name = $1
        WHERE id = $2
        RETURNING *;
        `,
        [name, id],
    );
    return rows[0];
}

module.exports = {
    getUnitById,
    getAllUnits,
    insertUnit,
    updateUnit,
};
