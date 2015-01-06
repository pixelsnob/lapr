
"use strict";

var mongoose   = require('mongoose'),
    Product    = require('./product');

var ProductCategorySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  slug: { type: String, unique: true }
}, { collection: 'product_categories' });

/*ProductCategorySchema.pre('remove', function(next) {
  Product.update(
    { categories: this._id },
    { $pull: { categories: this._id }},
    { multi: true },
    next
  );
});*/


module.exports = function(mai) {
  ProductCategorySchema.plugin(mai.plugin, {
    model: 'ProductCategory',
    startAt: 0
  });
  return mongoose.model('ProductCategory', ProductCategorySchema);
};


