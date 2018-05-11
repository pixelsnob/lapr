/**
 * selected_tags collection
 * 
 */
import Backbone from 'backbone';

export default Backbone.Collection.extend({

  initialize: function(opts) {},

  setFromArray: function(tags) {
    var obj = this,
      models = [],
      tags = (_.isArray(tags) ? tags : []);
    this.reset();
    if (!tags.length) {
      return;
    }
    tags.forEach(function(tag) {
      var model = obj.tags.findWhere({
        slug: tag
      });
      if (model) {
        obj.add(model);
      }
    });
  }

});
