const { fetchReviewByID, fetchReviews } = require("../models/reviews.model.js");

exports.getReviews = (req, res, next) => {
    fetchReviews()
        .then(data => {
            res.status(200).send({allReviews: data});
        })
        .catch(err => next(err));
};

exports.getReviewsByID = (req, res, next) => {
    fetchReviewByID(req.params.review_id)
        .then(data => {
            res.status(200).send({ReviewsByID: data});
        })
        .catch(err => next(err))
};