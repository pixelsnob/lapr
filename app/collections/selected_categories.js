/**
 * selected_categories collection
 * 
 */
import Backbone from 'backbone';

export default Backbone.Collection.extend({

  initialize: function(opts) {},

  // Finds a model in products_categories and adds it to the collection
  setFromSlug: function(slug) {
    this.reset();
    if (!slug) {
      return;
    }
    var model = this.product_categories.findWhere({
      slug: slug
    });
    if (model) {
      this.add(model);
    }
  }

});
