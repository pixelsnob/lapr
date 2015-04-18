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
        validators: [ 'required' ],
        help: '<em>Image must be < 250KB in size, and < 1000px wide</em>'
      },
      include_in_slideshow: {
        type: 'Checkbox',
        title: 'Include in Slideshow'
      }
    }
    
  });
});


