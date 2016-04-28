
'use strict';

var db = require('mongoose');

var ProductTypeSchema = new db.Schema({
  name: { type: String, unique: true }
}, { collection: 'product_types' });

ProductTypeSchema.pre('remove', next => {
  db.model('Product').update(
    { product_type: this._id },
    { $pull: { product_type: this._id }},
    { multi: true },
    next
  );
});

module.exports = mai => {
  ProductTypeSchema.plugin(mai.plugin, {
    model: 'ProductType',
    startAt: 1 
  });
  return db.model('ProductType', ProductTypeSchema);
};


