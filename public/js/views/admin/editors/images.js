/**
 * Images multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/images',
  'backbone-forms'
], function(
  Backbone,
  MultiSelectEditorView,
  ImagesView
) {
  return MultiSelectEditorView.extend({
    
    list_view: ImagesView


  });
});
