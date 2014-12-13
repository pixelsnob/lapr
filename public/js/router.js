
define([
  'backbone',
  'views/products'
], function(Backbone, ProductsView) {
  
  return Backbone.Router.extend({
    routes: {
      'products':                       'showProducts',
      'products/categories/:category':  'showProductsByCategory'
    },

    initialize: function() {
      // move this to lib or somewhere else
      $('a').on('click', function(ev) {
        var href = $(this).attr('href'), protocol = this.protocol + '//';
        if (href.slice(protocol.length) !== protocol && protocol !== 'javascript://'
            && href.substring(0, 1) !== '#') {
          ev.preventDefault();
          Backbone.history.navigate(href, true);
        }
      });
      this.products_view = new ProductsView;
    },

    showProducts: function() {
      this.products_view.render();
    },

    showProductsByCategory: function(category) {
      this.products_view.showByCategory(category);
    }
  });
});
