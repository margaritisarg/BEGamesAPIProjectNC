const { fetchReviewByID } = require("../models/reviews.model.js");

exports.getReviewsByID = (req, res, next) => {
    fetchReviewByID(req.params.review_id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => next(err))
};