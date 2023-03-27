const { fetchAllCategories } = require("../models/categories.model.js");

exports.getAllCategories = (req, res, next) => {
    fetchAllCategories()
        .then(data => {
            res.status(200).send(data);            
        });
};
