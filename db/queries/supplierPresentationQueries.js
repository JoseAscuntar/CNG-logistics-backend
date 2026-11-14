const pool = require("../pool.js");

async function getSupplierPresentationById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM supplier_presentations WHERE id = $1",
        [id],
    );
    return rows[0];
}

async function getAllSupplierPresentations() {
    const { rows } = await pool.query(
        "SELECT * FROM supplier_presentations WHERE active = TRUE",
    );
    return rows;
}

async function insertSupplierPresentation({
    supplier_id,
    presentation_id,
    buying_price,
}) {
    const { rows } = await pool.query(
        `
        INSERT INTO supplier_presentations (supplier_id, presentation_id, buying_price)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [supplier_id, presentation_id, buying_price],
    );
    return rows[0];
}

async function updateSupplierPresentation({ buying_price }, id) {
    const { rows } = await pool.query(
        `
        UPDATE supplier_presentations 
        SET buying_price = $1
        WHERE id = $2
        RETURNING *;
        `,
        [buying_price, id],
    );
    return rows[0];
}

module.exports = {
    getSupplierPresentationById,
    getAllSupplierPresentations,
    insertSupplierPresentation,
    updateSupplierPresentation,
};
