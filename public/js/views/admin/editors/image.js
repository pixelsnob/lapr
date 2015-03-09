/**
 * Image select
 * 
 * 
 */
define([
  'backbone',
  './select',
  'views/admin/images',
  'backbone-forms'
], function(
  Backbone,
  SelectEditorView,
  ImagesView
) {
  return SelectEditorView.extend({
    
    list_view: ImagesView


  });
});
