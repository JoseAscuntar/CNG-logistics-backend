const { Router } = require("express");
const { getAllPresentations, getPresentationById, createPresentation } = require("../controllers/presentationController.js");

const presentationRouter = Router();

presentationRouter.get("/", getAllPresentations);
presentationRouter.get("/:presentationId", getPresentationById);
presentationRouter.post("/", createPresentation);

module.exports = presentationRouter;
