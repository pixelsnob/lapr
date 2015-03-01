/**
 * Base form
 * 
 */
define([
  'backbone',
  'backbone-forms',
  'lib/form_validators'
], function(
  Backbone
) {
  
  return Backbone.Form.extend({

    initialize: function(opts) {
      Backbone.Form.prototype.initialize.apply(this, arguments);
    }

  });
});


