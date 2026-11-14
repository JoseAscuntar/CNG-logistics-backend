const { INTEGER_MAX } = require("../../constants/limits.js");
const CustomNotFoundError = require("../../errors/CustomNotFoundError.js");

function makeGetById(entity, getByIdDatabaseFunction, errorMessage) {
    return async function (req, res) {
        const idParameter = entity + "Id";
        const id = Number(req.params[idParameter]);

        if (!Number.isInteger(id) || id <= 0 || id > INTEGER_MAX) {
            throw new CustomNotFoundError(errorMessage);
        }

        const entityRow = await getByIdDatabaseFunction(id);
        if (!entityRow) {
            throw new CustomNotFoundError(errorMessage);
        }

        res.json(entityRow);
    };
}

module.exports = makeGetById;
