/**
 * image form
 * 
 */
define([
  'forms/base',
  'views/admin/editors/file/image'
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


