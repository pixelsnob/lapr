/**
 * Select with edit
 * 
 * 
 */
define([
  'backbone',
  'views/admin/modal/form',
  'template',
  'backbone-forms'
], function(
  Backbone,
  ModalFormView,
  template
) {
  return Backbone.Form.editors.Select.extend({
    
    events: { 
      'click .edit':      'edit'
    },

    initialize: function(opts) {
      Backbone.Form.editors.Select.prototype.initialize.call(this, opts); 
      this.setElement(template.render('admin/select', {
        name: this.key,
        editor_id: this.id
      }));
      this.$select = this.$el.find('select');
      //this.listenTo(this.schema.options, 'add remove change', this.refresh);
    },

    setValue: function(value) {
      this.$select.val(value);
    },

    // Make sure numeric ids don't get cast as strings
    getValue: function() {
      var value = this.$select.val();
      return Number(value);
    },

    // Refresh options but keep current value
    refresh: function() {
      var old_val = this.getValue();
      this.render();
      this.setValue(old_val);
    },

    renderOptions: function(options) {
      this.$select.html(this._getOptionsHtml(options));
      this.setValue(this.value);
    },

    render: function() {
      Backbone.Form.editors.Select.prototype.render.call(this);
      this.setValue(this.value);
      return this;
    },
    
    edit: function() {
      var view = new this.list_view({ collection: this.schema.options });
      view.renderModal();
      this.listenTo(view, 'close', this.refresh);
    }

  });
});
