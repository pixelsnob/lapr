/**
 * product_type form
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
      slug: {
        type: 'Text'
      }
    }
    
  });
});


