/**
 * Makers multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/makers',
  'backbone-forms'
], function(
  Backbone,
  MultiSelectEditorView,
  MakersView
) {
  return MultiSelectEditorView.extend({
    
    list_view: MakersView
    
  });
});
