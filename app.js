const express = require("express");
const app = express();
const { getAllCategories } = require("./controllers/categories.controller.js");
const { errorHandle } = require("./controllers/errorHandling.controller.js")

app.use(express.json());


app.get("/api/categories", getAllCategories)

app.get("*", (req, res) => res.status(404).send("Invalid URL"))

app.use(errorHandle)

app.listen(9090, (err) => {
    if(err) console.log(err);
    else console.log("Listening on port 9090.")
});

module.exports = app