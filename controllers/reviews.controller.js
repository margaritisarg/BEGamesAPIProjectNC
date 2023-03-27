const { fetchReviewByID } = require("../models/reviews.model.js");

exports.getReviewsByID = (req, res, next) => {
    fetchReviewByID(req.params.review_id)
        .then(data => {
            res.status(404).send(data);
        })
};