
exports.errorHandle = (err, req, res, next) => {   
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }
    else if(err.code === '23503'){
        let columnFK = (/[(]\w+[)]=/.exec(err.detail))[0]
        columnFK = columnFK.substring(1, columnFK.length-2)
        if(columnFK.includes("_")) columnFK = (columnFK.split("_"))[0];

        let input = (/[(]\w+[)] /.exec(err.detail))[0]
        input = input.substring(1, input.length-2)

        const errorMsg = `${columnFK} does not have a record of: '${input}' in its corresponding table`;
        res.status(400).send({post_error: errorMsg})
    }
    else{
        next(err)
    }
}

exports.errorPlaceHolder = (err, req, res) => {
    res.status(err.status).send("Error placeholder");
};

exports.invalidURL = (req, res) => {
    res.status(404).send({msg: "Invalid URL"})
}

