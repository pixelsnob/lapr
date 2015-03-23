/**
 * content_block form
 * 
 */
define([
  'forms/base'
  //'collections/content_blocks'
], function(
  BaseForm,
  ContentBlocks
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      /*this.schema.name.validators = [
        'required',
        {
          type: 'unique',
          name: 'name',
          model: this.model,
          collection: opts.collection
        }
      ];*/
      BaseForm.prototype.initialize.apply(this, arguments);
    },

    schema: {
      name: {
        type: 'Text'
      }
    }
    
  });
});


