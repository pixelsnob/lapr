
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  category: String,
  categories: Array,
  name: String,
  alt_names: String,
  maker: String,
  makers: Array,
  _description: String,
  description: String,
  model_no: String,
  price: String,
  range: String,
  image: String,
  sizes: String,
  octaves: Number
});

ProductSchema.getSearch = function(str, cb) {
};

var model = module.exports = mongoose.model('Product', ProductSchema);
