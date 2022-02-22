
function checkError(err, req, res, next ){
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        let formattedError = {
          status: err.statusCode,
          message: err.message
        }
        return res.status(err.statusCode).json(formattedError); // Bad request
    }
    next();
}


module.exports = checkError