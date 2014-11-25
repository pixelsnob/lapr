
"use strict";

var mongoose   = require('mongoose')

var ProductCategorySchema = new mongoose.Schema({
  name: String,
  slug: String
}, { collection: 'product_categories' });

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);


