const db = require("../db/connection.js")

exports.deleteCommentByIdOnComments = (req) => {
    const commentID = req.params.comment_id.toString();
    
    const sql = 
    `
        DELETE FROM comments
            WHERE comment_id = $1;
    `;
    return db.query(sql, [commentID])
        .then(result => {
            if(result.rowCount === 0){
                return {status: 204}
            }else{
                return {
                    status: 204
                }
            }
        })
}