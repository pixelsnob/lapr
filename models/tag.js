
"use strict";

var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
  name: String,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TagCategory' }]
});

module.exports = mongoose.model('Tag', TagSchema);

