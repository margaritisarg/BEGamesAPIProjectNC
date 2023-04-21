const { 
    fetchReviewByID, fetchReviews, fetchCommentsByReviewID, insertCommentWithID,
    updateVotesWithReviewID, fetchReviewsQuery
} = require("../models/reviews.model.js");


exports.patchVotesByReviewID = (req, res, next) => {
    updateVotesWithReviewID(req)
        .then((data) => {
            res.status(200).send({review: data})
        })
        .catch(err => next(err));
}

exports.postCommentWithReviewID = (req, res, next) => {
    insertCommentWithID(req)
        .then((data) => {
            res.status(201).send(data)
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
    if(Object.keys(req.query).length === 0){
        fetchReviews()
            .then(data => {
                res.status(200).send({reviews: data});
            })
            .catch(err => next(err));
    }else{
        fetchReviewsQuery(req.query)
            .then(data => {
                if(data.status === 204) res.sendStatus(data.status);
                else res.status(200).send({reviews: data});
            })
            .catch(err => next(err));
    }
};

exports.getReviewsByID = (req, res, next) => {
    fetchReviewByID(req.params.review_id)
        .then(data => {
            res.status(200).send({ReviewsByID: data});
        })
        .catch(err => next(err))
};