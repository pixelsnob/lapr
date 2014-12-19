
"use strict";

var mongoose = require('mongoose'),
    Product    = require('./product');

var TagSchema = new mongoose.Schema({
  name: String,
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

module.exports = mongoose.model('Tag', TagSchema);

