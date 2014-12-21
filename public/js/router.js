
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  
  return Backbone.Router.extend({
    routes: {
      'products':                       'showProducts',
      //'products/categories/:category':  'showProductsByCategory',
      'products/tags/':                 'showProducts',
      'products/tags/:tags':           'filterProductsByTags'
    },

    initialize: function() {
      // move this to lib or somewhere else
      /*$('a').on('click', function(ev) {
        var href = $(this).attr('href'), protocol = this.protocol + '//';
        if (href.slice(protocol.length) !== protocol && protocol !== 'javascript://'
            && href.substring(0, 1) !== '#') {
          ev.preventDefault();
          Backbone.history.navigate(href, true);
        }
      });*/
      this.app_view = new AppView;
    },

    showProducts: function() {
      this.app_view.renderProducts();
    },

    //showProductsByCategory: function(category) {
      //this.products_view.showByCategory(category);
    //},

    filterProductsByTags: function(tags) {
      console.log(tags);
      this.app_view.filterProductsByTags(tags.split(','));
    }
  });
});
