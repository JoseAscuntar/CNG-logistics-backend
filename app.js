const express = require("express");
const app = express();
const { loadEnvFile } = require("node:process");
loadEnvFile();

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, error => {
    if (error) {
        throw error;
    }
    console.log("Listening on port", PORT);
});
