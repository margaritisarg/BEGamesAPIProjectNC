const db = require("../db/connection.js")

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
