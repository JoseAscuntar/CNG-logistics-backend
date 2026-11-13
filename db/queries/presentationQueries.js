const pool = require("../pool.js");

async function getPresentationById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM presentations WHERE id = $1",
        [id],
    );
    return rows[0];
}

async function getAllPresentations() {
    const { rows } = await pool.query(
        "SELECT * FROM presentations WHERE active = TRUE",
    );
    return rows;
}

async function insertPresentation({ product_id, amount, unit_id }) {
    const { rows } = await pool.query(
        `
        INSERT INTO presentations (product_id, amount, unit_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [product_id, amount, unit_id],
    );
    return rows[0];
}

async function updatePresentation({ product_id, amount, unit_id }, id) {
    const { rows } = await pool.query(
        `
        UPDATE presentations 
        SET (product_id, amount, unit_id) = ($1, $2, $3)
        WHERE id = $4
        RETURNING *;
        `,
        [product_id, amount, unit_id, id],
    );
    return rows[0];
}

module.exports = {
    getPresentationById,
    getAllPresentations,
    insertPresentation,
    updatePresentation,
};
