
"use strict";

var mongoose   = require('mongoose');

var ErrorSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  message: String,
  json: Object
});

module.exports = function() {
  return mongoose.model('Error', ErrorSchema);
};

