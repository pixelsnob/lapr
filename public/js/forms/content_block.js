/**
 * content_block form
 * 
 */
define([
  'forms/base',
  'forms/editors/content_block'
], function(
  BaseForm,
  ContentBlockEditor
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      if (opts.check_unique) {
        this.schema.name.validators = [
          'required',
          {
            type: 'unique',
            name: 'name',
            model: this.model,
            collection: opts.collection
          }
        ];
      }
      BaseForm.prototype.initialize.apply(this, arguments);
      if (opts.name_disabled) {
        this.fields.name.editor.$el.attr('disabled', true);
      }
    },

    schema: {
      name: {
        type: 'Text'
      },
      content: {
        //type: 'TextArea',
        type: ContentBlockEditor,
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


