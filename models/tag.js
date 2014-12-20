
"use strict";

var mongoose = require('mongoose'),
    Product    = require('./product');

var TagSchema = new mongoose.Schema({
  name: String,
  slug: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'TagCategory' }
});

TagSchema.pre('remove', function(next) {
  Product.update(
    { tags: this._id },
    { $pull: { tags: this._id }},
    { multi: true },
    next
  );
});

/*TagSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = require('../lib/slug')(this.name); 
  }
  next();
});*/

module.exports = mongoose.model('Tag', TagSchema);

