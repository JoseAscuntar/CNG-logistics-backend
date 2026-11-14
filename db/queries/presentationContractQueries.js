const pool = require("../pool.js");

async function getPresentationContractById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM presentation_contracts WHERE id = $1",
        [id],
    );
    return rows[0];
}

async function getAllPresentationContracts() {
    const { rows } = await pool.query(
        "SELECT * FROM presentation_contracts WHERE active = TRUE",
    );
    return rows;
}

async function insertPresentationContract({
    presentation_id,
    contract_id,
    selling_price,
}) {
    const { rows } = await pool.query(
        `
        INSERT INTO presentation_contracts (presentation_id, contract_id, selling_price)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [presentation_id, contract_id, selling_price],
    );
    return rows[0];
}

async function updatePresentationContract({ selling_price }, id) {
    const { rows } = await pool.query(
        `
        UPDATE presentation_contracts 
        SET selling_price = $1
        WHERE id = $2
        RETURNING *;
        `,
        [selling_price, id],
    );
    return rows[0];
}

module.exports = {
    getPresentationContractById,
    getAllPresentationContracts,
    insertPresentationContract,
    updatePresentationContract,
};
