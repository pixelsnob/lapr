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
        this.listenTo(opts.schema.options, 'change remove', this.render);
      }
    }

  });
});
