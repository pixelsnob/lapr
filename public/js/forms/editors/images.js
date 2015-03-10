/**
 * Images multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/lists/images',
  'backbone-forms'
], function(
  Backbone,
  MultiSelectEditorView,
  ImagesView
) {
  return MultiSelectEditorView.extend({
    
    list_view: ImagesView,

    render: function() {
      MultiSelectEditorView.prototype.render.call(this);
      return this;
    }


  });
});
