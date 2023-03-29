const db = require("../db/connection.js")

exports.insertCommentWithID = (req) => {
    if((req.params.review_id).match(/^\d+$/)){
        const insertDataArray = [];
        insertDataArray.push(req.body.body)
        insertDataArray.push(parseInt(req.params.review_id))
        insertDataArray.push(req.body.author)
        
        const sql = 
        `
            INSERT INTO comments
                (body, review_id, author)
            VALUES($1, $2, $3 );
        `;
        return db.query(sql, insertDataArray);
    }else{
        return Promise.reject({status: 400, msg: "400 - Bad input"});            
    }
}

exports.fetchCommentsByReviewID = (reviewID) => {
    if(reviewID.match(/^\d+$/)) {
        const sql = 
        `
            SELECT * FROM comments 
                WHERE review_id = $1;
        `;

        return db.query(sql, [reviewID])
            .then(result => {
                if(result.rowCount === 0) {
                    return Promise.reject({status: 204, msg: "204 - No content found"});            
                }else{
                    return result.rows;          
                }
            });
    }else{
        return Promise.reject({status: 400, msg: "400 - Bad input"});            
    }
};

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

exports.fetchReviewByID = (reviewID) => {
    if(reviewID.match(/^\d+$/)) {
        const sql = 
        `
            SELECT * FROM reviews WHERE review_id = $1;
        `;
      
        return db.query(sql, [reviewID])
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
