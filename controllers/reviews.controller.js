const { 
    fetchReviewByID, fetchReviews, fetchCommentsByReviewID, insertCommentWithID 
} = require("../models/reviews.model.js");

exports.postCommentWithReviewID = (req, res, next) => {
    insertCommentWithID(req)
        .then((data) => {
            res.status(201).send({status: "Inserted successfully", rowCount: data.rowCount})
        })
        .catch(err => next(err));
}

exports.getCommentsByReviewID = (req, res, next) => {
    fetchCommentsByReviewID(req.params.review_id)
        .then(data => {
            res.status(200).send({commentsByReviewID: data})
        })
        .catch(err => next(err));
};

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