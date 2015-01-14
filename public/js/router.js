
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  
  return Backbone.Router.extend({

    routes: {
      'instruments':                       'showProductsByCategory',
      'instruments/categories/:category':  'showProductsByCategory',
      'instruments/tags':                  'showProductsByTags',
      'instruments/tags/':                 'showProductsByTags',
      'instruments/tags/:tags':            'showProductsByTags'
    },

    initialize: function() {
      this.app_view = new AppView;
    },
    
    showProductsByCategory: function(category) {
      this.app_view.showProductsByCategory(category);
    },
    
    showProductsByTags: function(tags) {
      tags = (tags && tags.length ? tags.split(',') : []);
      this.app_view.showProductsByTags(tags);
    }

  });
});
