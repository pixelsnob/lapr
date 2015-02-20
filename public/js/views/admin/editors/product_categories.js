/**
 * Product categories multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/product_categories',
  'backbone-forms'
], function(
  Backbone,
  MultiSelectEditorView,
  ProductCategoriesView
) {
  return MultiSelectEditorView.extend({
    
    list_view: ProductCategoriesView

  });
});
