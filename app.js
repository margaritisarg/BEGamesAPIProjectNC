const express = require("express");
const app = express();
const { getAllCategories } = require("./controllers/categories.controller.js");
const { errorHandle, invalidURL } = require("./controllers/errorHandling.controller.js")

app.use(express.json());


app.get("/api/categories", getAllCategories)

app.get("*", invalidURL)

app.use(errorHandle)


module.exports = app