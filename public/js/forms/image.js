/**
 * maker form
 * 
 */
define([
  'backbone',
  'views/forms/editors/file/image',//?
  'backbone-forms'
], function(
  Backbone, ImageEditor
) {
  
  return Backbone.Form.extend({

    schema: {
      name: {
        type: ImageEditor,
        validators: [ 'required' ]
      }
    }
    
  });
});


