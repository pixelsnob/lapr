/**
 * Multiselect
 * 
 * 
 */
define([ 'backbone', 'backbone-forms' ], function(Backbone) {
  return Backbone.Form.editors.Select.extend({
    
    initialize: function(opts) {
      this.$el.prop('multiple', true);
      Backbone.Form.editors.Select.prototype.initialize.call(this, opts); 
    },

    getValue: function(value) {
      var value = Backbone.Form.editors.Select.prototype.getValue.call(this); 
      if (_.isArray(value)) {
        var new_array = [];
        for (var i in value) {
          //console.log(value[i]);
          new_array.push(Number(value[i]));
        }
        return new_array;
      }
      //console.log(value);
      return value;
    },

    // Refresh editor in case options have changed -- this is less messy
    // than listening to collection events, etc.
    refresh: function(opts) {
      var old_val = this.getValue();
      this.render();
      this.setValue(old_val);
    }

  });
});
