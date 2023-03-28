
exports.errorHandle = (err, req, res, next) => {   
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }else{
        next(err)
    }
}

exports.errorPlaceHolder = (err, req, res) => {
    res.status(err.status).send("Error placeholder");
};

exports.invalidURL = (req, res) => {
    res.status(404).send({msg: "Invalid URL"})
}