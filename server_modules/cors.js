exports.middleware = function(req, res, next) {
    if(!res.headersSent) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    }

    next();
};
