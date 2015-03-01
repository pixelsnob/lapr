/**
 * Extends Backbone.Form.validators
 * 
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(
  Backbone
) {
  _.extend(Backbone.Form.validators, {
    
    number: function(options) {
      options = _.extend({
        type: 'number',
        message: 'Must be a number',
        regexp: /^[0-9]*\.?[0-9]*?$/
      }, options);
      return Backbone.Form.validators.regexp(options);
    }

  });
});
