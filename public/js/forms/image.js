/**
 * image form
 * 
 */
import BaseForm from 'forms/base';
import ImageEditor from 'forms/editors/file/image';

export default BaseForm.extend({

  schema: {
    name: {
      type: ImageEditor,
      validators: ['required'],
      help: '<em>Image must be < 250KB in size, and < 1000px wide</em>'
    }
  }

});


