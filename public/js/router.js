
define([
  'backbone'
], function(Backbone) {
  
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
      // Keep track of history
      this.history = [];
      var obj = this;
      this.listenTo(this, 'route', function (name, args) {
        obj.history.push({
          name : name,
          args : args,
          fragment : Backbone.history.fragment
        });
      });
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
      var previous_url;
      if (this.history.length) {
        previous_url = this.history[this.history.length - 1];
      }
      this.app_view.showProductDetails(product_id, previous_url);
    }

  });
});
