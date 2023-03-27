const express = require("express");
const app = express();
const { getAllCategories } = require("./controllers/categories.controller.js");
// const { handleError } = require("./controllers/errorHandlingController.js")

app.use(express.json());


app.get("/api/categories", getAllCategories)

// app.use(handleError)

app.listen(9090, (err) => {
    if(err) console.log(err);
    else console.log("Listening on port 9090.")
});

module.exports = app