var express = require('express');
var app = express();
var utils = require('./server_modules/utils');
var fileSystem = require('./server_modules/file_system');
var args = require('./server_modules/args');
var views = require('./server_modules/views');
var auth = require('./server_modules/auth');
var bodyParser = require('body-parser');
var log = require('./server_modules/log');
var closeRequest = () => {}; // A middleware that doesn't call the next() function.

var configs = [require('./server_modules/slave_mode')];

var middlewares = [express.static(fileSystem.resolve('src')),
                        require('cookie-parser')(),
                        bodyParser.urlencoded({ extended: true }),
                        bodyParser.json(),
                        utils.middleware,
                        require('./server_modules/sessions').middleware,
                        auth.initialize(),
                        auth.session(),
                        auth.middleware,
                        require('./server_modules/cors').middleware,
                        require('./server_modules/cache').middleware,
                        log.middleware];

var routers = [views,
                auth,
                fileSystem,
                require('./server_modules/sessions'),
                require('./server_modules/teams'),
                require('./server_modules/settings'),
                require('./server_modules/stages'),
                require('./server_modules/scores'),
                require('./server_modules/challenges')];

configs.forEach(config => config.configure(app));
middlewares.forEach(layer => app.use(layer));
routers.forEach(router => router.route(app));

app.listen(args.port, function() {
    log.log.info(`Listening on port ${args.port}`);
    log.log.info(`open browser to http://localhost:${args.port}/`);
});
