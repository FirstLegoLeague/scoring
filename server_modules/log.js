var fs = require('fs');
var path = require('path');
var rotate = require('rotating-file-stream');

const LOG_PATH = path.resolve(__dirname, '..', 'log', 'log.log');

if (!fs.existsSync(path.dirname(LOG_PATH))) {
    fs.mkdirSync(path.dirname(LOG_PATH))
}

var stream = rotate(LOG_PATH, {
    size:     '10M',
    interval: '1d'
});

exports.log = function(level, message) {
    let line = `${level.toUpperCase()} - ${new Date().toISOString().toLocaleString()}: ${message}`;

    console.log(line);
    fs.appendFileSync(LOG_PATH, line + '\n');
};

['debug', 'info', 'warn', 'error', 'fatal'].forEach(function(level) {
    exports.log[level] = function(message) {
        exports.log(level.toUpperCase(), message);
    }
});

exports.middleware = function(req, res, next) {
    req.log = res.log = exports.log;
    next();
};
