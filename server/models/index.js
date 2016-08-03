
"use strict";

var mongoose   = require('mongoose'),
    fs         = require('fs'),
    config     = require('../config'),
    mai        = require('mongoose-auto-increment');

var db = require('../lib/db')(config.db.name);
mai.initialize(db.connection);

var file_names = fs.readdirSync('./models').filter(function(file) {
  return !file.match(/^\./) && file != 'index.js';
});

file_names.forEach(function(file_name) {
  require('./' + file_name)(mai);
});

module.exports = db;
