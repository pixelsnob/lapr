
'use strict';

var db = require('mongoose');

var TagSchema = new db.Schema({
  name: { type: String, index: true, unique: true },
  slug: String,
  category: { type: Number, ref: 'TagCategory' }
});

TagSchema.pre('remove', function(next) {
  db.model('Product').update(
    { tags: this._id },
    { $pull: { tags: this._id }},
    { multi: true },
    next
  );
});

TagSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = require('../lib/slug')(this.name); 
  }
  next();
});

module.exports = mai => {
  TagSchema.plugin(mai.plugin, { model: 'Tag', startAt: 1 });
  return db.model('Tag', TagSchema);
};

