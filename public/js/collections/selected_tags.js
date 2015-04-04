/**
 * selected_tags collection
 * 
 */
define([
  'backbone',
], function(
  Backbone
) {
  return Backbone.Collection.extend({

    initialize: function(opts) {
    },

    setFromArray: function(tags) {
      var obj = this, models = [], tags = (_.isArray(tags) ? tags : []);
      this.reset();
      if (!tags.length) {
        return;
      }
      tags.forEach(function(tag) {
        var model = obj.tags.findWhere({ slug: tag });
        if (model) {
          obj.add(model);
        }
      });
    }

  });
});
