/**
 * content_block form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      this.schema.name.validators = [
        'required',
        {
          type: 'unique',
          name: 'name',
          model: this.model,
          collection: opts.collection
        }
      ];
      BaseForm.prototype.initialize.apply(this, arguments);
    },

    schema: {
      name: {
        type: 'Text'
      },
      content: {
        type: 'TextArea',
        validators: [ 'required' ]
      },
      type: {
        type: 'Select',
        options: [{ label: 'Markdown', val: 'markdown' }],
        validators: [ 'required' ]
      }
    }
    
  });
});


