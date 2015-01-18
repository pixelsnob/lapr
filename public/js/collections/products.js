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
  'collections/tag_categories'
], function(
  ProductModel,
  MakerModel,
  ProductCategoryModel,
  ProductsCollection,
  FilteredProductsCollection,
  ProductCategoriesCollection,
  MakersCollection,
  TagsCollection,
  TagCategoriesCollection
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
        selected_tags:        new Backbone.Collection,
        selected_categories:  new Backbone.Collection
      };
    },

    fetch: function(){
      var stored   = sessionStorage.getItem('lapr-products'),
          deferred = new jQuery.Deferred();
      if (stored) {
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

    parse: function(res) {
      this.refs.product_categories.reset(res.product_categories); 
      this.refs.makers.reset(res.makers); 
      this.refs.tags.reset(res.tags); 
      this.refs.tag_categories.reset(res.tag_categories); 
      return res.products;
    }
  });
});
