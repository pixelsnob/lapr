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
      // Update options when there is a change to the collection
      if (opts.schema.options instanceof Backbone.Collection) {
        var obj = this;
        this.listenTo(opts.schema.options, 'add change remove', function() {
          // Store old value and reset, in case user has updated values since
          // the form was rendered
          var old_val = obj.getValue();
          obj.render();
          obj.setValue(old_val);
        });
      }
    }

  });
});
