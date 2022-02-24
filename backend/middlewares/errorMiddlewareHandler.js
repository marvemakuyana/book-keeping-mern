const errorMiddlewareHandler = (err, req, res, next) => {
    //set status code
    const errorStausCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(errorStausCode);
    res.json({
        message: err.message
    })
}

module.exports = { errorMiddlewareHandler }