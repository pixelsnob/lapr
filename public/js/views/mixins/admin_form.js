/**
 * Admin form mixin
 * 
 */
define([
  'cms/views/modal/form',
  'template',
  'lib/dialog'
], function(
  ModalFormView,
  template,
  dialog
) {
  return {

    events: {
      'click .edit':    'renderEditForm'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'save', this.render);
    },

    render: function() {
      this.$el.append(template.render('admin/form', this.model.toJSON())); 
      return this;
    },

    renderEditForm: function(ev) {
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit ' + this.title,
        body: this.form.render().el,
        show_remove_button: true
      });
      this.listenTo(modal_view, 'save', this.save);
      this.listenTo(modal_view, 'remove', this.destroy);
      modal_view.listenTo(this, 'save destroy', modal_view.hide);
      this.listenTo(modal_view, 'close', function() {
        this.close();
        this.stopListening(this.model);
        modal_view.remove();
      });
    },

    renderAddForm: function(ev) {
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Add ' + this.title,
        body: this.form.render().el
      });
      this.listenTo(modal_view, 'save', this.save);
      modal_view.listenTo(this, 'save', modal_view.hide);
      this.on('save', _.bind(this.trigger, this, 'add'));
    },
    
    save: function() {
      var errors = this.form.commit();
      if (!errors) {
        this.model.save(this.model.attributes, {
          wait: true,
          success: _.bind(this.trigger, this, 'save'),
          error:   _.bind(this.showServerError, this)
        });
      } else {
        this.showServerError();
      }
    },
    
    destroy: function(ev) {
      var obj   = this,
          label = this.label || 'item';
      dialog.confirm({
        message: 'Are you sure you want to remove this ' + this.label + '?',
        callback: function(value) {
          if (value) {
            obj.model.destroy({
              wait: true,
              success: _.bind(obj.trigger, obj, 'destroy'),
              error: _.bind(obj.showServerError, obj)
            });
          }
        }
      });
    }
    
  };
});

