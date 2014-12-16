
"use strict";

var mongoose = require('mongoose');

var TagCategorySchema = new mongoose.Schema({
  name: String
}, { collection: 'tag_categories' });

module.exports = mongoose.model('TagCategory', TagCategorySchema);

