const db = require("../db/connection.js")

exports.fetchAllUsers = () => {
    const sql = "SELECT * FROM users;";
    return db.query(sql)
        .then(result => result.rows);
};
