const { deleteCommentByIdOnComments } = require("../models/comments.model.js");

exports.deleteCommentByID = (req, res, next) => {
    deleteCommentByIdOnComments(req)
        .then((data) => {
            res.sendStatus(data.status);
        })
        .catch(err => next(err));

}