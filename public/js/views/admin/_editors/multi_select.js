/**
 * Multiselect
 * 
 * 
 */
define([
  './select',
  'template'
], function(
  SelectEditor,
  template
) {
  return SelectEditor.extend({

    initialize: function(opts) {
      SelectEditor.prototype.initialize.call(this, opts); 
      this.schema.options = [];
      this.setElement(template.render('admin/multi_select', {
        name: this.key,
        editor_id: this.id
      }));
      this.$select = this.$el.find('select');
    },

    setValue: function(value) {
      this.$select.val(value);
    },

    // Make sure numeric ids don't get cast as strings
    getValue: function() {
      var value = this.$select.val();
      if (_.isArray(value)) {
        return value.map(function(v) { return Number(v); });
      }
      return [];
    }

  });
});
