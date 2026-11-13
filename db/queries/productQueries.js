const pool = require("../pool.js");

async function getProductById(id) {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return rows[0];
}

async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM products WHERE active = TRUE");
    return rows;
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

module.exports = {
    getProductById,
    getAllProducts,
    insertProduct,
}
