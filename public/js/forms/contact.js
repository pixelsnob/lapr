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
    }
    
  });
});


