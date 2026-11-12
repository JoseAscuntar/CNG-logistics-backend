const { INTEGER_MAX } = require("../../constants/limits.js");
const db = require("../../db/queries.js");
const CustomNotFoundError = require("../../errors/CustomNotFoundError.js");

function makeGetById(entity) {
    const capitalizedEntity = entity[0].toUpperCase() + entity.slice(1);
    const methodName = "get" + capitalizedEntity + "ById";

    return async function (req, res) {
        const idParameter = entity + "Id";
        const id = Number(req.params[idParameter]);

        if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
            throw new CustomNotFoundError(capitalizedEntity + " not found");
        }

        const entityRow = await db[methodName](id);
        if (!entityRow) {
            throw new CustomNotFoundError(capitalizedEntity + " not found");
        }
        
        res.json(entityRow);
    }
}

module.exports = makeGetById;
