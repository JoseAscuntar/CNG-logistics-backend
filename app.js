const express = require("express");
const cors = require("cors");

const app = express();
const supplierRouter = require("./routes/supplierRouter.js");
const productRouter = require("./routes/productRouter.js");
const presentationRouter = require("./routes/presentationRouter.js");
const contractRouter = require("./routes/contractRouter.js");
const clientRouter = require("./routes/clientRouter.js");
const unitRouter = require("./routes/unitRouter.js");
const legalEntityRouter = require("./routes/legalEntityRouter.js");
const presentationContractRouter = require("./routes/presentationContractRouter.js");
const supplierPresentationRouter = require("./routes/supplierPresentationRouter.js");
const {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} = require("./constants/httpStatusCodes.js");
const CustomNotFoundError = require("./errors/CustomNotFoundError.js");

app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL];
app.use(cors({ origin: allowedOrigins }));

app.use("/suppliers", supplierRouter);
app.use("/products", productRouter);
app.use("/presentations", presentationRouter);
app.use("/contracts", contractRouter);
app.use("/clients", clientRouter);
app.use("/units", unitRouter);
app.use("/legal-entities", legalEntityRouter);
app.use("/presentation-contracts", presentationContractRouter);
app.use("/supplier-presentations", supplierPresentationRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

app.use((req, res) => {
    throw new CustomNotFoundError("No se encontró esta ruta");
});

app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        res.status(BAD_REQUEST).json({
            message: "El request debe ser un JSON válido",
        });
    } else if (err.statusCode) {
        res.status(err.statusCode).json({
            message: err.message,
        });
    } else {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "Error interno del servidor",
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log("Listening on port", PORT);
});
