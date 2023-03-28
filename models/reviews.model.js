const db = require("../db/connection.js")

exports.fetchReviews = () => {
    const sql = 
    `
        SELECT 
            CAST(COUNT(c.review_id) AS INTEGER) AS comment_count, 
            r.title, r.owner, r.review_id, r.category, 
            r.review_img_url, r.created_at, r.votes, r.designer  
        FROM reviews r
            FULL OUTER JOIN comments c
                ON c.review_id = r.review_id
        GROUP BY 
            r.title, r.owner, r.review_id, r.category,
            r.review_img_url, r.created_at, r.votes, r.designer
        ORDER BY r.created_at DESC;  
    `;

    return db.query(sql)
        .then(result => {
            return result.rows;
        });
}

exports.fetchReviewByID = (query) => {
    
    let sql = "SELECT * FROM reviews WHERE review_id = ";

    if(Number.isInteger(parseInt(query))) {
        sql += `${query};`
      
        return db.query(sql)
            .then(result => {
                if(result.rowCount === 0) {
                    return Promise.reject({status: 404, msg: "404 - No content found"});            
                }else{
                    return result.rows;          
                }
            });
    }else{
        return Promise.reject({status: 400, msg: "400 - Bad input"});            
    }
};
