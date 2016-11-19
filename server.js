"use strict";
// setup express app
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
// require('./routes')(app);

app.listen(port);
console.log('Listening on port ' + port);