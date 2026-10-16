const express = require("express");
const app = express();
const supplierRouter = require("./routes/supplierRouter.js");
const productRouter = require("./routes/productRouter.js");
const presentationRouter = require("./routes/presentationRouter.js");
const contractRouter = require("./routes/contractRouter.js");
const clientRouter = require("./routes/clientRouter.js");

const { loadEnvFile } = require("node:process");
loadEnvFile();

app.use("/suppliers", supplierRouter);
app.use("/products", productRouter);
app.use("/presentations", presentationRouter);
app.use("/contracts", contractRouter);
app.use("/clients", clientRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({message: err.message});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, error => {
    if (error) {
        throw error;
    }
    console.log("Listening on port", PORT);
});
