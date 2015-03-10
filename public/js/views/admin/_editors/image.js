/**
 * Image select
 * 
 * 
 */
define([
  'backbone',
  './select',
  'views/admin/lists/images',
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
