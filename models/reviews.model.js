const db = require("../db/connection.js")

exports.fetchReviewsQuery = (params) => {
    let sql = ` SELECT * FROM reviews`

    if(params.category) sql += ` WHERE category = '${params.category}'`

    if(params.sort_by){
        const column = params.sort_by;
        if(column === 'review_id') sql += ` ORDER BY ${column}`
        else if(column === 'title') sql += ` ORDER BY ${column}`
        else if(column === 'category') sql += ` ORDER BY ${column}`
        else if(column === 'desinger') sql += ` ORDER BY ${column}`
        else if(column === 'owner') sql += ` ORDER BY ${column}`
        else if(column === 'votes') sql += ` ORDER BY ${column}`
        else if(column === 'created_at') sql += ` ORDER BY ${column}`
        else sql += ` ORDER BY created_at`
    }else sql += ` ORDER BY created_at`

    if(params.order) sql += ` ${params.order};`
    else sql += ` DESC;`

    return db.query(sql)
        .then((data) => {
            if(data.rowCount === 0) {
                return {status: 204, msg: "No content found"};            
            }else{
                return data.rows       
            }
        }); 
}

exports.updateVotesWithReviewID = (req) => {

    if(!req.body.votes) return Promise.reject({status: 400, msg: "400 - Bad input"});
    const votes = req.body.votes.toString();

    const reviewID = req.params.review_id;
    if(reviewID.match(/^\d+$/) && votes.match(/^(\d+$|-\d+)$/)){
        const sql =
        `
            UPDATE reviews
                SET votes = votes + $1
            WHERE review_id = $2
            RETURNING *;   
        `;
        return db.query(sql, [votes, reviewID])
        .then((data) => {
            if(data.rowCount === 0) {
                return {status: 404, msg: "No content found"};            
            }else{
                return data.rows[0]       
            }
        });
    }else{
        return Promise.reject({status: 400, msg: "400 - Bad input"});            
    }
}

exports.insertCommentWithID = (req) => {
    const props = req.body;
    
    if(!props.username || !props.body) {
        return Promise.reject({status: 400, msg: "400 - Bad input"});       
    }
    for(const prop in props){
        if(prop !== "username" && prop !== "body") {
            return Promise.reject({status: 400, msg: "400 - Bad input"});
        }  
    }
    const insertDataArray = [];
    insertDataArray.push(props.username)
    insertDataArray.push(props.body)
    
    const reviewID = req.params.review_id;
    insertDataArray.push(reviewID)
  
    const sql = 
    `
        INSERT INTO comments
            (author, body, review_id)
        VALUES($1, $2, $3 );
    `;
    return db.query(sql, insertDataArray)
        .then((result) => {
            if(result.rowCount === 0){
                return Promise.reject({status: 404, msg: "404 - No content found"});            
            }else{
                return {
                    status: "Inserted successfully", 
                    rowCount: result.rowCount, 
                    comment: {username: props.username, body: props.body}
                }
            }
        })
        .catch(err => Promise.reject(err))
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
