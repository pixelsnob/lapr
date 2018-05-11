/**
 * Content block editor
 * 
 * 
 */
import Backbone from 'backbone';
import template from 'template';
import 'backbone-forms';
export default Backbone.Form.editors.TextArea.extend({

  events: {
    'click .edit': 'edit'
  },

  initialize: function(opts) {
    Backbone.Form.editors.TextArea.prototype.initialize.call(this, opts);
    this.setElement(template.render('admin/content_block_editor', {
      name: this.key,
      editor_id: this.id
    }));
    this.$textarea = this.$el.find('textarea');
  },

  setValue: function(value) {
    this.$textarea.val(value);
  },

  getValue: function() {
    return this.$textarea.val();
  }


});
