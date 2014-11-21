
var mongoose   = require('mongoose'),
    lunr       = require('lunr'),
    _          = require('underscore');

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

ProductSchema.statics.search = function(query, opts, str, cb) {
  this.find(query, null, opts, function(err, products) {
    if (err) {
      return cb(err);
    }
    if (str) {
      var search_index = lunr(function() {
        this.field('name');
        this.field('alt_names');
        this.field('_description');
        this.field('category');
        this.field('makers');
        this.field('model_no');
      });
      products.forEach(function(product) {
        search_index.add(product);
      });
      var search_res = search_index.search(str);
      if (search_res) {
        // Discard products that don't exist in the full text search
        // results
        products = products.filter(function(product) {
          return _.findWhere(search_res, { ref: String(product._id) });
        });
      }
    }
    cb(null, products);
  });
};

module.exports = mongoose.model('Product', ProductSchema);

