
'use strict';

var db = require('mongoose');

var TagSchema = new db.Schema({
  name: String,
  slug: String,
  category: { type: db.Schema.Types.ObjectId, ref: 'TagCategory' }
});

TagSchema.pre('remove', function(next) {
  db.model('Product').update(
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

module.exports = function(mai) {
  return db.model('Tag', TagSchema);
};

