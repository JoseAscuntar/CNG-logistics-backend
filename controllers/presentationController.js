const db = require("../db/queries.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getAllPresentations(req, res) {
    const presentations = await db.getAllPresentations();
    res.json(presentations);
}

async function getPresentationById(req, res) {
    const { presentationId } = req.params;
    const id = Number(presentationId);
    if (!Number.isInteger(id) || id <= 0) {
        throw new CustomNotFoundError("Presentation not found");
    }

    const presentation = await db.getPresentationById(id);
    if (!presentation) {
        throw new CustomNotFoundError("Presentation not found");
    }
    
    res.json(presentation);
}

module.exports = {
    getAllPresentations,
    getPresentationById,
}
