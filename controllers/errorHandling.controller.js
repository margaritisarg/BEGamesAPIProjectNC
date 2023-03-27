
exports.errorHandle = (err, req, res, next) => {
    console.log("In errorHandle")
    
    if(err.status && err.msg){
        console.log("In IF block of error handle.");
        res.status(err.status).send({msg: err.msg});
    }else{
        console.log("In ELSE block of error handle.");
        next(err)
    }
}
