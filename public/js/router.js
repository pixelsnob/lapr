
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  
  return Backbone.Router.extend({
    routes: {
      'products':                       'showProducts',
      //'products/categories/:category':  'showProductsByCategory',
      //'products/tags/':                 'showProducts',
      'products/tags':                 'filterProductsByTags',
      'products/tags/':                'filterProductsByTags',
      'products/tags/:tags':           'filterProductsByTags'
    },

    initialize: function() {
      this.app_view = new AppView;
    },

    showProducts: function() {
      this.app_view.renderProducts();
    },

    //showProductsByCategory: function(category) {
      //this.products_view.showByCategory(category);
    //},

    filterProductsByTags: function(tags) {
      tags = (tags && tags.length ? tags.split(',') : []);
      this.app_view.filterProductsByTags(tags);
    }
  });
});
