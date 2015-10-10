
"use strict";

var mongoose   = require('mongoose');

var ErrorSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  message: String,
  json: String
});

module.exports = function() {
  return mongoose.model('Error', ErrorSchema);
};

