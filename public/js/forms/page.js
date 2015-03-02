/**
 * page form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  return BaseForm.extend({

    initialize: function() {
      BaseForm.prototype.initialize.apply(this, arguments);
      //this.fields.path.schema.validators.push({ type: 'unique', model: '2' });
    },

    schema: {
      path: {
        type: 'Text',
        validators: [ 'required', { type: 'unique' } ]
      },
      title: {
        type: 'Text',
        validators: [ 'required' ]
      },
      description: {
        type: 'Text',
        validators: [ ]
      },
      view: {
        type: 'Text',
        validators: [ ]
      }/*,
      content_blocks: {
        type: 'Text',
        validators: [ 'required' ]
      }*/
    }
    
  });
});


