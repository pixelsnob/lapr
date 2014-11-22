
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
  full_image: String,
  sizes: String,
  octaves: Number
});

/**
 * Runs a product "full text" search
 * 
 */
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
        this.field('makers');
        this.field('category');
        this.field('model_no');
        this.field('range');
        this.field('sizes');
      });
      products.forEach(function(product) {
        search_index.add({
          id:            product._id,
          name:          product.name,
          alt_names:     product.alt_names,
          _description:  product._description,
          makers:        product.makers.join(', '),
          model_no:      product.model_no,
          range:         product.range,
          sizes:         product.sizes
        });
      });
      var search_res = search_index.search(str);
      if (search_res) {
        products = products.filter(function(product) {
          return _.findWhere(search_res, { ref: String(product._id) });
        });
      }
    }
    cb(null, products);
  });
};

/**
 * Gets distinct product categories
 * 
 */
ProductSchema.statics.getCategories = function(cb) {
  this.find().distinct('categories', cb);
};

/**
 * Get makers for a given set of ids
 * 
 */
ProductSchema.statics.getMakersInIds = function(ids, cb) {
  this.find({ _id: { $in: ids }}).distinct('makers', cb);
};

module.exports = mongoose.model('Product', ProductSchema);


