/**
 * user form
 * 
 */
import BaseForm from 'forms/base';

export default BaseForm.extend({

  schema: {
    username: {
      type: 'Text',
      validators: ['required']
    },
    password: {
      type: 'Text',
      validators: ['required']
    }
  }

});


