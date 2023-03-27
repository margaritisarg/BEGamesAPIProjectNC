const db = require("../db/connection.js")

exports.fetchReviewByID = (query) => {
    let sql = "SELECT * FROM reviews";
    if(Number.isInteger(query)) sql += ` WHERE review_id = ${query};`
    return db.query(sql)
        .then(result => result.rows);
};
