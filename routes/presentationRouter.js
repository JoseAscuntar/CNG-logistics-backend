const { Router } = require("express");
const {
    getAllPresentations,
    getPresentationById,
    createPresentation,
    editPresentation,
} = require("../controllers/presentationController.js");

const presentationRouter = Router();

presentationRouter.get("/", getAllPresentations);
presentationRouter.get("/:presentationId", getPresentationById);
presentationRouter.post("/", createPresentation);
presentationRouter.put("/:presentationId", editPresentation);

module.exports = presentationRouter;
