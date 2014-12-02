
"use strict";

var mongoose   = require('mongoose'),
    fs         = require('fs'),
    models     = module.exports = [];

require('../lib/db')('lapr');

var file_names = fs.readdirSync(__dirname).filter(function(file) {
  return !file.match(/^\./) && file != 'index.js';
});

file_names.forEach(function(file_name) {
  var model = require('./' + file_name);
  models[model.modelName] = model;
});

