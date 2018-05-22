/**
 * products collection
 * 
 */
import ProductModel from '../models/product';
import FilteredProductsCollection from 'collections/filtered_products';
import ProductCategoriesCollection from 'collections/product_categories';
import MakersCollection from 'collections/makers';
import TagsCollection from 'collections/tags';
import TagCategoriesCollection from 'collections/tag_categories';
import SelectedTagsCollection from 'collections/selected_tags';
import SelectedCategoriesCollection from 'collections/selected_categories';
import YoutubeVideosCollection from 'collections/youtube_videos';
import ImagesCollection from 'collections/images';
import lunr from 'lunr';

export default Backbone.Collection.extend({

  url: '/instruments',

  model: ProductModel,

  comparator: 'name',

  initialize: function() {
    this.refs = {
      filtered_products: new FilteredProductsCollection,
      product_categories: new ProductCategoriesCollection,
      makers: new MakersCollection,
      tags: new TagsCollection,
      tag_categories: new TagCategoriesCollection,
      selected_tags: new SelectedTagsCollection,
      selected_categories: new SelectedCategoriesCollection,
      youtube_videos: new YoutubeVideosCollection,
      images: new ImagesCollection
    };
    this.refs.selected_tags.tags = this.refs.tags;
    this.refs.selected_categories.product_categories = this.refs.product_categories;
  },

  fetch: function() {
    var stored = this.getStored();
    if (stored && !window.lapr.user) {
      this.reset(stored.data.products);
      this.refs.product_categories.reset(stored.data.product_categories);
      this.refs.makers.reset(stored.data.makers);
      this.refs.tags.reset(stored.data.tags);
      this.refs.tag_categories.reset(stored.data.tag_categories);
      this.refs.youtube_videos.reset(stored.data.youtube_videos);
      this.refs.images.reset(stored.data.images);
      return Promise.resolve(this);
    } else {
      return Backbone.Collection.prototype.fetch.call(this).then(res => {
        var data = {
          products: res.products,
          product_categories: res.product_categories,
          makers: res.makers,
          tags: res.tags,
          tag_categories: res.tag_categories,
          youtube_videos: res.youtube_videos,
          images: res.images
        };
        this.setStored(data);
      });
    }
  },

  // Get from session storage, if any
  getStored: function() {
    var stored = sessionStorage.getItem('lapr-products');
    if (!stored) {
      return false;
    }
    stored = JSON.parse(stored);
    // If stored data age exceeds max, return false so that data can be fetched
    // from server
    var t = (new Date).getTime(),
      d = 1000 * 60 * 60;
    if (stored.timestamp && (t - stored.timestamp) > d) {
      return false;
    }
    return stored;
  },

  // Stores products in session storage, along with a timestamp
  setStored: function(data) {
    var data = {
      timestamp: (new Date).getTime(),
      data: data
    };
    sessionStorage.setItem('lapr-products', JSON.stringify(data));
  },

  // Set refs from server data on fetch()
  parse: function(res) {
    this.refs.product_categories.reset(res.product_categories);
    this.refs.makers.reset(res.makers);
    this.refs.tags.reset(res.tags);
    this.refs.tag_categories.reset(res.tag_categories);
    this.refs.youtube_videos.reset(res.youtube_videos);
    this.refs.images.reset(res.images);
    return res.products;
  },

  // Filters products by tags and adds them to the filtered_products
  // collection
  filterByTags: function() {
    var tag_ids = this.refs.selected_tags.pluck('_id');
    var products = this.filter(function(product) {
      // If there are no tags specified, return all tagged products
      if (!tag_ids.length) {
        var tags = product.get('tags');
        return _.isArray(tags) && tags.length;
      }
      var temp_tag_ids = tag_ids.filter(function(tag_id) {
        return _.contains(product.get('tags'), tag_id);
      });
      // Filter product if all of the selected tags exist in the product's
      // tags array
      return temp_tag_ids.length == tag_ids.length;
    });
    this.refs.filtered_products.reset(products);
    this.refs.filtered_products.setPage(1);
    this.refs.filtered_products.trigger('filtered');
  },

  // Filters products by categories and adds them to the filtered_products
  // collection
  filterByCategory: function() {
    var selected_category = this.refs.selected_categories.at(0),
      selected_category_id = selected_category ? selected_category.id : null;
    var products = this.filter(function(product) {
      // Return all products if no category specified
      if (!selected_category_id) {
        return true;
      }
      return _.contains(product.get('categories'), selected_category_id);
    });
    this.refs.filtered_products.reset(products);
    this.refs.filtered_products.setPage(1);
    this.refs.filtered_products.trigger('filtered');
  },

  // Creates the index of products to use in a full text search
  createProductsIndex: function() {
    this.index = lunr(function() {
      this.ref('id');
      this.field('name');
      this.field('alt_names');
      this.field('description');
      this.field('makers');
      this.field('categories');
      this.field('model_no');
      this.field('range');
      this.field('sizes');
    });
    _.each(this.models, product => {
      product = product.toJSON();
      var makers = '';
      if (_.isArray(product.makers) && product.makers.length) {
        makers = product.makers.map(maker_id => {
          var maker = this.refs.makers.findWhere({
            _id: Number(maker_id)
          });
          return (maker ? maker.get('name') : '');
        }).join(',');
      }
      var categories = '';
      if (_.isArray(product.categories) && product.categories.length) {
        categories = product.categories.map(category_id => {
          var category = this.refs.product_categories.findWhere({
            _id: Number(category_id)
          });
          return (category ? category.get('name') : '');
        }).join(', ');
      }
      this.index.add({
        id: product._id,
        name: product.name,
        alt_names: product.alt_names,
        description: product.description,
        makers: makers,
        categories: categories,
        model_no: product.model_no,
        range: product.range,
        sizes: product.sizes
      });
    });
  },

  search: function(search, limit = 0) {
    if (!this.index) {
      return [];
    }
    var search_res = this.index.search(search),
      products = [];
    _.each(search_res, product => {
      var product_model = this.findWhere({
        _id: Number(product.ref)
      });
      if (product_model) {
        products.push(product_model);
      }
    });
    if (limit > 0) {
      return products.splice(0, limit);
    }
    return products;
  },

  getSearchResults: function(search, limit = 0) {
    var search_res = this.search(search, limit),
      products = [];
    _.each(search_res, product => {
      products.push(product);
    });
    return products;
  },

  filterByTextSearch: function(search) {
    this.refs.filtered_products.reset(this.search(search));
    this.refs.filtered_products.setPage(1);
    this.refs.filtered_products.trigger('filtered');
  },

  unbindRefs: function() {
    for (var ref in this.refs) {
      this.refs[ref].unbind();
    }
  }

});
