/**
 * tag_category form
 * 
 */
define([
  'collections/tag_categories',
  'forms/base'
], function(
  TagCategories,
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
      category: {
        title: 'Tag Category',
        type: 'Select',
        options: new TagCategories,
        validators: [ 'required' ]
      },
      slug: {
        title: 'Slug',
        type: 'Text',
        validators: []
      }
    }
    
  });
});


