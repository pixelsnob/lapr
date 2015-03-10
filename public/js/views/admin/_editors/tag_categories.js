/**
 * Tags multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/lists/tag_categories',
  'backbone-forms'
], function(
  Backbone,
  MultiSelectEditorView,
  TagCategoriesView
) {
  return MultiSelectEditorView.extend({
    
    list_view: TagCategoriesView
    
  });
});
