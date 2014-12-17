/**
 * Products list view
 * 
 */
define([
  'views/base',
  'collections/products',
  'collections/product_categories',
  'collections/makers',
  'collections/tags',
  'collections/tag_categories',
  'views/product'
], function(
  BaseView,
  ProductsCollection,
  ProductCategoriesCollection,
  MakersCollection,
  TagsCollection,
  TagCategoriesCollection,
  ProductView
) {
  
  return BaseView.extend({
    
    collection:           new ProductsCollection,
    product_categories:   new ProductCategoriesCollection,
    makers:               new MakersCollection,
    tags:                 new TagsCollection,
    tag_categories:       new TagCategoriesCollection,

    el: '.products',
    
    events: {
    },

    initialize: function(opts) {
      this.collection.reset(window.lapr.products); 
      this.product_categories.reset(window.lapr.product_categories); 
      this.makers.reset(window.lapr.makers); 
      this.tags.reset(window.lapr.tags); 
      this.tag_categories.reset(window.lapr.tag_categories); 
    },
    
    render: function(products) {
      var obj = this;
      products = products || this.collection;
      var fragment = document.createDocumentFragment();
      products.forEach(function(product) {
        var view = new ProductView({
          model:              product,
          makers:             obj.makers,
          product_categories: obj.product_categories,
          tags:               obj.tags,
          tag_categories:     obj.tag_categories
        });
        fragment.appendChild(view.render().el);
      });
      this.$el.find('tbody').html(fragment);
      return this;
    },
    
    showByCategory: function(slug) {
      var obj = this;
      var products = this.collection.filter(function(product) { 
        return _.some(product.get('categories'), function(id) {
          var category = obj.product_categories.findWhere({ _id: id });
          if (!category) {
            return;
          }
          return category.get('slug') == slug;
        });
      });
      this.render(products);
      return false;
    }

  });
  
});
