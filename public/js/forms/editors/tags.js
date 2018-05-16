/**
 * Tags multiselect
 * 
 * 
 */
import Backbone from 'backbone';
import MultiSelectEditorView from './multi_select';
import TagsView from 'views/admin/lists/tags';
import 'backbone-forms';

export default MultiSelectEditorView.extend({

  list_view: TagsView,

  // Build tags tree structure
  renderOptions: function(options) {
    var tree = [];
    this.schema.tag_categories.forEach(function(category) {
      tree.push({
        group: category.get('name'),
        options: options.filter(function(tag) {
          return tag.get('category') == category.id;
        }).map(function(tag) {
          return {
            val: tag.id,
            label: tag.get('name')
          };
        })
      });
    });
    this.$select.html(this._getOptionsHtml(tree));
    this.setValue(this.value);
  }

});
