/**
 * Contact form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  return BaseForm.extend({
    
    initialize: function(opts) {
      BaseForm.prototype.initialize.apply(this, arguments);
    },

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      email: {
        type: 'Text',
        validators: [ 'required', 'email' ]
      },
      phone: {
        type: 'Text',
        validators: [ ]
      },
      comments: {
        type: 'TextArea',
        validators: [ 'required' ]
      }
    },

    validate: function(opts) {
      _.each(this.fields, function(field) {
        var trimmed_val = $.trim(field.editor.getValue());
        field.editor.setValue(trimmed_val);
      });
      return BaseForm.prototype.validate.apply(this, arguments);
    }
    
  });
});


