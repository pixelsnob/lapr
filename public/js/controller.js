/**
 * Application controller
 * 
 */
import Backbone from 'backbone';

export default function(app_view) {

  return {

    showIndex: function() {
      app_view.showIndex();
    },

    showProductsByCategory: function(category) {
      app_view.showProductsByCategory(category);
    },

    showProductsByTags: function(tags) {
      app_view.showProductsByTags(tags);
    },

    showProductsByTextSearch: function(search) {
      app_view.showProductsByTextSearch(search);
    },

    showProductDetails: function(product_id, previous_url) {
      app_view.showProductDetails(product_id, previous_url);
    },

    showContact: function() {
      app_view.showContact();
    }
  }
};


