exports.middleware = function(req, res, next) {
  if(!res.headersSent) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
  }

  next();
};
