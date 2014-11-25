
"use strict";

var mongoose   = require('mongoose');

var MakerSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Maker', MakerSchema);

