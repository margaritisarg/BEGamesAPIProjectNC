const express = require("express");
const app = express();
const { getAllCategories } = require("./controllers/categories.controller.js");
const { getReviewsByID, getReviews, getCommentsByReviewID, postCommentWithReviewID, patchVotesByReviewID } = require("./controllers/reviews.controller.js")
const { errorHandle, invalidURL, errorPlaceHolder } = require("./controllers/errorHandling.controller.js")
const { deleteCommentByID } = require("./controllers/comments.controller.js")
const { getAllUsers } = require("./controllers/users.controller.js")

app.use(express.json());


app.get("/api/categories", getAllCategories)
app.get("/api/reviews/:review_id", getReviewsByID)
app.get("/api/reviews", getReviews)
app.get("/api/reviews/:review_id/comments", getCommentsByReviewID)
app.post("/api/reviews/:review_id/comments", postCommentWithReviewID)
app.delete("/api/comments/:comment_id", deleteCommentByID)
app.patch("/api/reviews/:review_id", patchVotesByReviewID)
app.get("/api/users", getAllUsers)

app.get("*", invalidURL)
app.patch("*", invalidURL)

app.use(errorHandle)
app.use(errorPlaceHolder)

module.exports = app