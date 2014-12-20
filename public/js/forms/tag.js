/**
 * tag_category form
 * 
 */
define([
  'collections/tag_categories',
  'backbone',
  'backbone-forms'
], function(
  TagCategories
) {
  
  return Backbone.Form.extend({

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      category: {
        title: 'Tag Category',
        type: 'Select',
        options: new TagCategories 
      },
      slug: {
        title: 'Slug',
        type: 'Text',
        validators: []
      }
    }
    
  });
});


