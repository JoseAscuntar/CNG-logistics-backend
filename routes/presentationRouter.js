const { Router } = require("express");
const { getAllPresentations, getPresentationById } = require("../controllers/presentationController.js");

const presentationRouter = Router();

presentationRouter.get("/", getAllPresentations);
presentationRouter.get("/:presentationId", getPresentationById);

module.exports = presentationRouter;
