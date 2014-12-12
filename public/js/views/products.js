/**
 * Products list view
 * 
 */
define([
  'views/base',
  'collections/products',
  'collections/product_categories',
  'views/product'
], function(
  BaseView,
  ProductsCollection,
  ProductCategoriesCollection,
  ProductView
) {
  
  return BaseView.extend({
    
    collection: new ProductsCollection,
    
    categories: new ProductCategoriesCollection,

    el: '.products',
    
    events: {
    },

    initialize: function(opts) {
      // temporary <<<<<<<<<<<<<<<<
      this.collection.fetch(); 
      this.categories.fetch();
    },
    
    render: function(products) {
      products = products || this.collection;
      var fragment = document.createDocumentFragment();
      products.forEach(function(product) {
        var view = new ProductView({ model: product });
        fragment.appendChild(view.render().el);
      });
      this.$el.find('tbody').html(fragment);
      return this;
    },
    
    showByCategory: function(slug) {
      var obj = this;
      var products = this.collection.filter(function(product) { 
        return _.some(product.get('categories'), function(id) {
          var category = obj.categories.findWhere({ _id: id });
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
