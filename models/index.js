
"use strict";

var mongoose   = require('mongoose'),
    fs         = require('fs'),
    config     = require('../config'),
    mai        = require('mongoose-plugin-autoinc');

var db = require('../lib/db')(config.db.name);

var file_names = fs.readdirSync(__dirname).filter(file => 
  !file.match(/^\./) && file != 'index.js'
);

file_names.forEach(file_name => {
  require('./' + file_name)(mai);
});

module.exports = db;

