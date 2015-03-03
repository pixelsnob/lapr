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

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
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


