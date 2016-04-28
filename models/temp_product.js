
var mongoose = require('mongoose');

var TempProduct = new mongoose.Schema({
  category:          String,
  categories:        [{ type: Number, ref: 'ProductCategory' }],
  name:              String,
  slug:              String,
  alt_names:         String,
  maker:             String,
  makers:            [{ type: Number, ref: 'Maker' }],
  description:       String,
  old_description:   String,
  model_no:          String,
  price:             String,
  range:             String,
  thumbnail:         String,
  image:             String,
  //images:            [ String ],
  sizes:             String,
  octaves:           Number,
  tags:              [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, { collection: 'temp_products' });

module.exports = mai => mongoose.model('TempProduct', TempProduct);

