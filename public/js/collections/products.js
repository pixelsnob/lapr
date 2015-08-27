/**
 * products collection
 * 
 */
define([
  '../models/product',
  '../models/maker',
  '../models/product_category',
  'collections/products',
  'collections/filtered_products',
  'collections/product_categories',
  'collections/makers',
  'collections/tags',
  'collections/tag_categories',
  'collections/selected_tags',
  'collections/selected_categories',
  'collections/youtube_videos',
  'lunr'
], function(
  ProductModel,
  MakerModel,
  ProductCategoryModel,
  ProductsCollection,
  FilteredProductsCollection,
  ProductCategoriesCollection,
  MakersCollection,
  TagsCollection,
  TagCategoriesCollection,
  SelectedTagsCollection,
  SelectedCategoriesCollection,
  YoutubeVideosCollection,
  lunr
) {
  return Backbone.Collection.extend({
    
    url: '/instruments',

    model: ProductModel,

    comparator: 'name',

    initialize: function() {
      this.refs = {
        filtered_products:    new FilteredProductsCollection,
        product_categories:   new ProductCategoriesCollection,
        makers:               new MakersCollection,
        tags:                 new TagsCollection,
        tag_categories:       new TagCategoriesCollection,
        selected_tags:        new SelectedTagsCollection,
        selected_categories:  new SelectedCategoriesCollection,
        youtube_videos:       new YoutubeVideosCollection
      };
      this.refs.selected_tags.tags                     = this.refs.tags;
      this.refs.selected_categories.product_categories = this.refs.product_categories;
    },

    fetch: function(){
      var stored   = this.getStored(),
          deferred = new jQuery.Deferred(),
          obj      = this;
      if (stored && !window.lapr.user) {
        this.reset(stored.products);
        this.refs.product_categories.reset(stored.product_categories);
        this.refs.makers.reset(stored.makers);
        this.refs.tags.reset(stored.tags);
        this.refs.tag_categories.reset(stored.tag_categories);
        this.refs.youtube_videos.reset(stored.youtube_videos);
        deferred.resolve();
        return deferred.promise();
      } else {
        return Backbone.Collection.prototype.fetch.call(this).done(function(res) {
          var data = {
            products: res.products,
            product_categories: res.product_categories,
            makers: res.makers,
            tags: res.tags,
            tag_categories: res.tag_categories,
            youtube_videos: res.youtube_videos
          };
          obj.setStored(data);
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
      var data = { timestamp: (new Date).getTime(), data: data };
      sessionStorage.setItem('lapr-products', JSON.stringify(data));
    },

    // Set refs from server data on fetch()
    parse: function(res) {
      this.refs.product_categories.reset(res.product_categories); 
      this.refs.makers.reset(res.makers); 
      this.refs.tags.reset(res.tags); 
      this.refs.tag_categories.reset(res.tag_categories); 
      this.refs.youtube_videos.reset(res.youtube_videos); 
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
      var obj                  = this,
          selected_category    = this.refs.selected_categories.at(0),
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
      var obj = this;
      _.each(this.models, function(product) {
        product = product.toJSON();
        var makers = '';
        if (_.isArray(product.makers) && product.makers.length) {
          makers = product.makers.map(function(maker_id) {
            var maker = obj.refs.makers.findWhere({ _id: Number(maker_id) });
            return (maker ? maker.get('name') : '');
          }).join(',');
        }
        var categories = '';
        if (_.isArray(product.categories) && product.categories.length) {
          categories = product.categories.map(function(category_id) {
            var category = obj.refs.product_categories.findWhere({
              _id: Number(category_id)
            });
            return (category ? category.get('name') : '');
          }).join(', ');
        }
        obj.index.add({
          id:            product._id,
          name:          product.name,
          alt_names:     product.alt_names,
          description:   product.description,
          makers:        makers,
          categories:    categories,
          model_no:      product.model_no,
          range:         product.range,
          sizes:         product.sizes
        });
      });
    },
    
    search: function(search) {
      if (!this.index) {
        return [];
      }
      var search_res = this.index.search(search),
          products   = [],
          obj        = this;
      _.each(search_res, function(product) {
        var product_model = obj.findWhere({
          _id: Number(product.ref)
        });
        if (product_model) {
          products.push(product_model);
        }
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
});
