const pool = require("./pool.js");

const products = [
    {id: 1, name: "Muffin"},
    {id: 2, name: "Pan de chocolate"},
];

const presentations = [
    {id: 1, productId: 1, grams: 30},
    {id: 2, productId: 1, grams: 50},
    {id: 3, productId: 1, grams: 70},
    {id: 4, productId: 2, grams: 30},
    {id: 5, productId: 2, grams: 50},
    {id: 6, productId: 2, grams: 70},
];

const clients = [
    {id: 1, name: "Donde Camilo", city: "Barichara"},
    {id: 2, name: "Restaurante La Selva", city: "Villa de Leyva"},
    {id: 3, name: "Moluscos y Crustaceos", city: "Tunja"},
];

const contracts = [
    {id: 1, name: "Licitación 1", legalFigure: "CNG", clientId: 2},
    {id: 2, name: "Licitación 2", legalFigure: "Consorcio Dios Proveerá", clientId: 1},
    {id: 3, name: "Licitación 3", legalFigure: "UT Corazón de obrero", clientId: 3},
];

async function getSupplierById(id) {
    const { rows } = await pool.query("SELECT * FROM suppliers WHERE id = $1", [id]);
    return rows[0]; // Using the [0] so that !supplier in the supplier controller is true if the id is missing and the 404 message is actually sent
}

async function getProductById(id) {
    return products.find(product => product.id === id);
}

async function getPresentationById(id) {
    return presentations.find(presentation => presentation.id === id);
}

async function getClientById(id) {
    return clients.find(client => client.id === id);
}

async function getContractById(id) {
    return contracts.find(contract => contract.id === id);
}

async function getAllSuppliers() {
    const { rows } = await pool.query("SELECT * FROM suppliers WHERE active = TRUE");
    return rows;
}

async function getAllProducts() {
    return products;
}

async function getAllPresentations() {
    return presentations;
}

async function getAllClients() {
    return clients;
}

async function getAllContracts() {
    return contracts;
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
    getAllContracts
};
