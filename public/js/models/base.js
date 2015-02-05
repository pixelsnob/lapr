/**
 * App base model
 * 
 */
define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    
    idAttribute: '_id',

    // Makes it so that reordered arrays don't count as "changed" --
    // looks at array values and not whether the keys/values are the same
    changedAttributes: function(attrs) {
      var attrs = Backbone.Model.prototype.changedAttributes.call(this, attrs);
      if (attrs === false) {
        return attrs;
      }
      for (var attr in attrs) {
        var prev = this.previousAttributes()[attr];
        if (prev && _.isArray(prev) && _.isArray(attrs[attr])) {
          if (_.isEqual(prev.sort(), attrs[attr].sort())) {
            delete attrs[attr];
          }
        }
      }
      return (_.isEmpty(attrs) ? false : attrs);
    }

  });
});

