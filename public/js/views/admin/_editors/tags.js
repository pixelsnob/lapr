/**
 * Tags multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/lists/tags',
  'backbone-forms'
], function(
  Backbone,
  MultiSelectEditorView,
  TagsView
) {
  return MultiSelectEditorView.extend({
    
    list_view: TagsView,

    // Build tags tree structure
    renderOptions: function(options) {
      var tree = [],
          obj  = this;
      this.schema.tag_categories.forEach(function(category) {
        tree.push({
          group:   category.get('name'),
          options: options.filter(function(tag) {
            return tag.get('category') == category.id;
          }).map(function(tag) {
            return { val: tag.id, label: tag.get('name') };
          })
        });
      });
      this.$select.html(this._getOptionsHtml(tree));
      this.setValue(this.value);
    }
    
  });
});
