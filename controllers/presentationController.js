const makeGetAll = require("./functionFactories/makeGetAll.js");
const makeGetById = require("./functionFactories/makeGetById.js");

const getAllPresentations = makeGetAll("presentations");
const getPresentationById = makeGetById("presentation");

module.exports = {
    getAllPresentations,
    getPresentationById,
}
