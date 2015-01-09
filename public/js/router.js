
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  
  return Backbone.Router.extend({
    routes: {
      'instruments':                       'showProducts',
      //'instruments/categories/:category':  'showProductsByCategory',
      //'instruments/tags/':                 'showProducts',
      'instruments/tags':                 'filterProductsByTags',
      'instruments/tags/':                'filterProductsByTags',
      'instruments/tags/:tags':           'filterProductsByTags'
    },

    initialize: function() {
      this.app_view = new AppView;
    },

    showProducts: function() {
      this.app_view.showProducts();
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
