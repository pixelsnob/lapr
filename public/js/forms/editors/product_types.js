/**
 * Product types multiselect
 * 
 * 
 */
define([
  'backbone',
  './select',
  'views/admin/lists/product_types',
  'backbone-forms'
], function(
  Backbone,
  SelectEditorView,
  ProductTypesView
) {
  return SelectEditorView.extend({
    
    list_view: ProductTypesView

  });
});
