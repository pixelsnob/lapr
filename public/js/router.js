
define([
  'backbone'
], function(Backbone) {
  
  var navigate  = Backbone.history.navigate,
      history   = [];
  Backbone.history.navigate = function(fragment, options){
    navigate.apply(this, arguments);
    history.push(fragment);
  }

  return Backbone.Router.extend({

    routes: {
      '':                                  'showIndex',
      'instruments':                       'showProductsByCategory',
      'instruments/':                      'showProductsByCategory',
      'instruments/categories/:category':  'showProductsByCategory',
      'instruments/tags':                  'showProductsByTags',
      'instruments/tags/':                 'showProductsByTags',
      'instruments/tags/:tags':            'showProductsByTags',
      'instruments/:slug/:product_id':     'showProductDetails'
    },

    initialize: function(opts) {
      this.app_view = opts.app_view;
    },

    showIndex: function() {
      //this.app_view.showIndex();
    },

    showProductsByCategory: function(category) {
      this.app_view.showProductsByCategory(category);
    },
    
    showProductsByTags: function(tags) {
      tags = (tags && tags.length ? tags.split(',') : []);
      this.app_view.showProductsByTags(tags);
    },

    showProductDetails: function(slug, product_id) {
      this.app_view.showProductDetails(product_id, history[history.length - 1]);
    }

  });
});


