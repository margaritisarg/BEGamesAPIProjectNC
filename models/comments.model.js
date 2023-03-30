const db = require("../db/connection.js")

exports.deleteCommentByIdOnComments = (req) => {
    const commentID = req.params.comment_id.toString();
    if(commentID.match(/^\d+$/)) {      
        
        const sql = 
        `
            DELETE FROM comments
                WHERE comment_id = $1;
        `;
        return db.query(sql, [commentID])
            .then(result => {
                if(result.rowCount === 0){
                    return {status: 404, msg: "Not found"}
                }else{
                    return {
                        status: 200,
                        command: result.command,
                        count: result.rowCount,
                        note: "Successfully deleted"
                    }
                }
            })
    }else{
        return Promise.reject({status: 400, msg: "400 - Bad input"});            
    }
}