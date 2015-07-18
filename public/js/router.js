
define([
  'backbone'
], function(Backbone) {
  
  var navigate  = Backbone.history.navigate,
      history   = [ window.location.pathname ];

  Backbone.history.navigate = function(fragment, opts) {
    navigate.apply(this, arguments);
    history.push(fragment);
  };

  window.addEventListener('popstate', function(e) {
    Backbone.history.navigate(Backbone.history.getFragment(), { trigger: true, replace: true });
  });

  return Backbone.Router.extend({

    routes: {
      '':                                  'showIndex',
      '/':                                 'showIndex',
      'instruments':                       'showProductsByCategory',
      'instruments/':                      'showProductsByCategory',
      'instruments/categories/:category':  'showProductsByCategory',
      'instruments/tags':                  'showProductsByTags',
      'instruments/tags/':                 'showProductsByTags',
      'instruments/tags/:tags':            'showProductsByTags',
      'instruments/text-search/:search':   'showProductsByTextSearch',
      'instruments/:slug/:product_id':     'showProductDetails',
      'contact':                           'showContact'
    },

    initialize: function(opts) {
      this.controller = opts.controller;
    },

    showIndex: function() {
      this.controller.showIndex();
    },

    showProductsByCategory: function(category) {
      this.controller.showProductsByCategory(category);
    },
    
    showProductsByTags: function(tags) {
      tags = (tags && tags.length ? tags.split(',') : []);
      this.controller.showProductsByTags(tags);
    },

    showProductsByTextSearch: function(search) {
      this.controller.showProductsByTextSearch(search);
    },

    showProductDetails: function(slug, product_id) {
      this.controller.showProductDetails(product_id, history[history.length - 1]);
    },
    
    showContact: function() {
      this.controller.showContact();
    }

  });

});


