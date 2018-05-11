/**
 * Product categories list view
 * 
 */
import BaseView from 'views/base';
import CategoriesCollection from 'collections/categories';

export default BaseView.extend({

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
