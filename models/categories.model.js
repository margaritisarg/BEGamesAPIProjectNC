const db = require("../db/connection.js")

exports.fetchAllCategories = () => {
    const sql = "SELECT * FROM categories;";
    return db.query(sql)
        .then(result => result.rows);
};
