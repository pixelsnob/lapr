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
    
    list_view: ImagesView,

    render: function() {
      SelectEditorView.prototype.render.apply(this);
      this.$select.prepend('<option value="">');
      return this;
    }

  });
});
