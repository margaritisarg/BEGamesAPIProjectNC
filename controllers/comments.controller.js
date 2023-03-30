const { deleteCommentByIdOnComments } = require("../models/comments.model.js");

exports.deleteCommentByID = (req, res, next) => {
    deleteCommentByIdOnComments(req)
        .then((data) => {
            res.status(200).send({deleted: data});
        })
        .catch(err => next(err));

}