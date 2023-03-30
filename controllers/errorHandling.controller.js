
exports.errorHandle = (err, req, res, next) => {   
    if(err.code === "22P02"){
        res.status(400).send({errorCode: err.code, msg: "invalid syntax type"})
    }
    else if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }
    else if(err.code === '23503'){
        let input = (/[(]\w+[)] /.exec(err.detail))[0]
        input = input.substring(1, input.length-2)

        const errorMsg = `${input} not found`;
        res.status(404).send({status: 404, msg: errorMsg})
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

