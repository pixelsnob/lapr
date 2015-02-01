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
  'collections/selected_categories'
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
  SelectedCategoriesCollection
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
        selected_categories:  new SelectedCategoriesCollection
      };
      this.refs.selected_tags.tags                     = this.refs.tags;
      this.refs.selected_categories.product_categories = this.refs.product_categories;
    },

    fetch: function(){
      var stored   = sessionStorage.getItem('lapr-products'),
          deferred = new jQuery.Deferred();
      if (stored && !window.cms.user) {
        stored = JSON.parse(stored);
        this.reset(stored.products),
        this.refs.product_categories.reset(stored.product_categories),
        this.refs.makers.reset(stored.makers),
        this.refs.tags.reset(stored.tags),
        this.refs.tag_categories.reset(stored.tag_categories)
        deferred.resolve();
        return deferred.promise();
      } else {
        return Backbone.Collection.prototype.fetch.call(this).done(function(res) {
          var data = {
            products: res.products,
            product_categories: res.product_categories,
            makers: res.makers,
            tags: res.tags,
            tag_categories: res.tag_categories
          };
          sessionStorage.setItem('lapr-products', JSON.stringify(data));
        });
      }
    },

    // Set refs from server data on fetch()
    parse: function(res) {
      this.refs.product_categories.reset(res.product_categories); 
      this.refs.makers.reset(res.makers); 
      this.refs.tags.reset(res.tags); 
      this.refs.tag_categories.reset(res.tag_categories); 
      return res.products;
    },

    // Filters products by tags and adds them to the filtered_products
    // collection
    filterByTags: function() {
      var tag_ids = this.refs.selected_tags.pluck('_id');
      //var t = (new Date).getTime();
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
      this.refs.filtered_products.state.currentPage = 0;
      this.refs.filtered_products.fullCollection.reset(products);
      this.trigger('filtered');
    },
    
    // Filters products by categories and adds them to the filtered_products
    // collection
    filterByCategory: function() {
      //var t = (new Date).getTime();
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
      this.refs.filtered_products.state.currentPage = 0;
      this.refs.filtered_products.fullCollection.reset(products);
      //console.log((new Date).getTime() - t);
      this.trigger('filtered');
    },

    unbindRefs: function() {
      for (var ref in this.refs) {
        this.refs[ref].unbind();
      }
    }

  });
});
