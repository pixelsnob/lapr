/**
 * product_category form
 * 
 */
define([
  'forms/base',
  'collections/content_blocks'
], function(
  BaseForm,
  ContentBlocksCollection
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
      this.fields.more_info_content_block.schema.options = new ContentBlocksCollection;
    },

    schema: {
      name: {
        type: 'Text'
      },
      more_info_content_block: {
        type: 'Select',
        options: []
      },
      slug: {
        type: 'Text'
      }
    }
    
  });
});


