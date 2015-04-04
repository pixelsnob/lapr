/**
 * tag_category view
 * 
 */
define([
  './base',
  'models/tag_category',
  'forms/tag_category'
], function(
  ListItemBaseView,
  TagCategoryModel,
  TagCategoryForm
) {
  
  return ListItemBaseView.extend({
    label: 'tag category',
    title: 'Tag Category',
    
    model: new TagCategoryModel,
    
    form_obj: TagCategoryForm
    
  });
});

