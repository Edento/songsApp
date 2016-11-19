var logger = require('morgan');

module.exports = function(app) {
    app.use(logger('dev'));

    app.get('/', function(req, res) {
        res.sendFile(__dirname + "/index.html");
    });

};