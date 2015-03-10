/**
 * image form
 * 
 */
define([
  'forms/base',
  'forms/editors/file/image'
], function(
  BaseForm,
  ImageEditor
) {
  
  return BaseForm.extend({

    schema: {
      name: {
        type: ImageEditor,
        validators: [ 'required' ]
      }
    }
    
  });
});


