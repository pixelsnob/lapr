/**
 * Product categories list view
 * 
 */
define([
  'views/base',
  'collections/categories'
], function(
  BaseView,
  CategoriesCollection
) {
  
  return BaseView.extend({
    
    collection: new CategoriesCollection,
    
    el: '.categories',
    
    events: {
      'click a': 'getProducts'
    },

    initialize: function(opts) {
      this.listenTo(this.collection, 'sync', this.render);
      this.collection.fetch(); 
    },
    
    render: function() {
      return this;
    }

  });
  
});
