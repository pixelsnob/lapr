
define([
  'backbone'
], function(Backbone) {
  
  var history = [];

  Backbone.history.back = function() {
    var previous = history[history.length - 2];
    if (previous) {
      Backbone.history.navigate(previous, true);
    }
  };

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
    
    // Add a "before route" event
    route: function(route, name, cb) {
      Backbone.Router.prototype.route.call(this, route, name, function() {
        if (!cb) {
          cb = this[name];
        }
        this.trigger('before-route');
        cb.apply(this, arguments);
      });
    },

    initialize: function(opts) {
      this.controller = opts.controller;
      this.listenTo(this, 'before-route', this.storeRoute);
    },
    
    // Store route in history, to provide "back" functionality for closing
    // popups, etc.
    storeRoute: function() {
      var fragment = Backbone.history.getFragment().replace(/^\//, '');
      history.push(fragment); 
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
      this.controller.showProductDetails(product_id);
    },
    
    showContact: function() {
      this.controller.showContact();
    }

  });

});


