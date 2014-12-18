
"use strict";

var mongoose   = require('mongoose'),
    Product    = require('./product');

var ProductCategorySchema = new mongoose.Schema({
  name: String,
  slug: String
}, { collection: 'product_categories' });

ProductCategorySchema.pre('remove', function(next) {
  Product.update(
    { categories: this._id },
    { $pull: { categories: this._id }},
    { multi: true },
    next
  );
});


module.exports = mongoose.model('ProductCategory', ProductCategorySchema);


