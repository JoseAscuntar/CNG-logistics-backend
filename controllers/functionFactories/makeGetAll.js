const db = require("../../db/queries.js");

function makeGetAll(entity) {
    const capitalizedEntity = entity[0].toUpperCase() + entity.slice(1);
    const methodName = `getAll${capitalizedEntity}`;
    
    return async function (req, res) {
        const entityRows = await db[methodName]();
        res.json(entityRows);
    }
}

module.exports = makeGetAll;
