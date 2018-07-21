/**
 * selected_tags collection
 * 
 */
import Backbone from 'backbone';

export default Backbone.Collection.extend({

  initialize: function(opts) {},

  setFromArray: function(tags) {
    var models = [],
      tags = (_.isArray(tags) ? tags : []);
    this.reset();
    if (!tags.length) {
      return;
    }
    tags.forEach(tag => {
      var model = this.tags.findWhere({
        slug: tag
      });
      if (model) {
        this.add(model);
      }
    });
  }

});
