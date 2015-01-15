
'use strict';

var db = require('mongoose');

var ProductCategorySchema = new db.Schema({
  name: { type: String, unique: true },
  slug: { type: String, unique: true }
}, { collection: 'product_categories' });

ProductCategorySchema.pre('remove', function(next) {
  db.model('Product').update(
    { categories: this._id },
    { $pull: { categories: this._id }},
    { multi: true },
    next
  );
});

ProductCategorySchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = require('../lib/slug')(this.name); 
  }
  next();
});

module.exports = function(mai) {
  ProductCategorySchema.plugin(mai.plugin, {
    model: 'ProductCategory',
    startAt: 1
  });
  return db.model('ProductCategory', ProductCategorySchema);
};


