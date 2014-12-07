
"use strict";

var mongoose = require('mongoose');

var TonalQualitySchema = new mongoose.Schema({
  name: String
}, { collection: 'tonal_qualities' });

module.exports = mongoose.model('TonalQuality', TonalQualitySchema);

