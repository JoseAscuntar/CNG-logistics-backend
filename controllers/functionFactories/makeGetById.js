const { INTEGER_MAX } = require("../../constants/limits.js");
const CustomNotFoundError = require("../../errors/CustomNotFoundError.js");

function makeGetById(entity, getByIdDatabaseFunction) {
    const capitalizedEntity = entity[0].toUpperCase() + entity.slice(1);

    return async function (req, res) {
        const idParameter = entity + "Id";
        const id = Number(req.params[idParameter]);

        if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
            throw new CustomNotFoundError(capitalizedEntity + " not found");
        }

        const entityRow = await getByIdDatabaseFunction(id);
        if (!entityRow) {
            throw new CustomNotFoundError(capitalizedEntity + " not found");
        }

        res.json(entityRow);
    };
}

module.exports = makeGetById;
