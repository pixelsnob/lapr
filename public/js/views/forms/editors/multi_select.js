/**
 * Multiselect
 * 
 * 
 */
define([ 'backbone', 'backbone-forms' ], function(Backbone) {
  return Backbone.Form.editors.Select.extend({
    
    // Overridden so collection gets fetched each time options are rendered
    setOptions: function(options) {
      var self = this;
      //If a collection was passed, check if it needs fetching
      if (options instanceof Backbone.Collection) {
        var collection = options;
        collection.fetch({
          success: function(collection) {
            self.renderOptions(options);
          }
        });
      }

      //If a function was passed, run it to get the options
      else if (_.isFunction(options)) {
        options(function(result) {
          self.renderOptions(result);
        }, self);
      }

      //Otherwise, ready to go straight to renderOptions
      else {
        this.renderOptions(options);
      }
    }, 
    
    /*renderOptions: function(opts) {
      Backbone.Form.editors.Select.prototype.renderOptions.call(this, opts);
      console.log('render');
      return this;
    },*/

    initialize: function(opts) {
      this.$el.prop('multiple', true);
      Backbone.Form.editors.Select.prototype.initialize.call(this, opts); 
      // Update options when there is a change to the collection
      if (opts.schema.options instanceof Backbone.Collection) {
        var obj = this;
        // But not on sync
        this.listenToOnce(opts.schema.options, 'sync', function() {
          obj.listenTo(opts.schema.options, 'add change remove', function() {
            // Store old value and reset, in case user has updated values since
            // the form was rendered
            var old_val = obj.getValue();
            obj.render();
            obj.setValue(old_val);
          });
        });
      }
    }

  });
});
