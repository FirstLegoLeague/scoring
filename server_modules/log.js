var fs = require('fs');
var path = require('path');
var rotate = require('rotating-file-stream');
var morgan = require('morgan');

const LOG_PATH = path.resolve(__dirname, '..', 'log', 'log.log');
const MORGAN_FORMAT = 'DEBUG [:date[iso]]: :method :url - :status in :response-time ms';

if (!fs.existsSync(path.dirname(LOG_PATH))) {
    fs.mkdirSync(path.dirname(LOG_PATH))
}

var stream = rotate(LOG_PATH, {
    size:     '10M',
    interval: '1d'
});

exports.log = function(level, message) {
    let line = `${level.toUpperCase()} [${new Date().toISOString().toLocaleString()}]: ${message}`;

    console.log(line);
    fs.appendFileSync(LOG_PATH, line + '\n');
};

['debug', 'info', 'warn', 'error', 'fatal'].forEach(function(level) {
    exports.log[level] = function(message) {
        exports.log(level.toUpperCase(), message);
    }
});

exports.configure = function(app) {
    app.use(morgan(MORGAN_FORMAT));
    app.use(morgan(MORGAN_FORMAT, { stream: stream }));

    app.use(function(req, res, next) {
        req.log = res.log = exports.log;
        next();
    })
};
