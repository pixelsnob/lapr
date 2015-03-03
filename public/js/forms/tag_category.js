/**
 * tag_category form
 * 
 */
define([
  'forms/base',
  'collections/tag_categories'
], function(
  BaseForm,
  TagCategories
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      //console.log(opts.collection);
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
      sort_order: {
        title: 'Sort Order',
        type: 'Text',
        validators: [  ]
      }
    }
    
  });
});


