/**
 * product view
 * 
 */
define([
  'views/base',
  'models/product',
  './modal/form',
  'forms/product',
  'lib/dialog'
], function(
  BaseView,
  ProductModel,
  ModalFormView,
  ProductForm,
  dialog
) {
  return BaseView.extend({

    events: {
    },
    
    initialize: function(opts) {
      this.model    = opts.model || new ProductModel;
      this.refs     = opts.refs;
      this.mode     = opts.mode || 'edit';
    },
    
    render: function() {
      this.form = new ProductForm({
        model: this.model,
        refs: this.refs
      }).render();
      this.listenTo(this.form, 'init-error', this.showServerError);
      this.setElement(this.form.el);
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Product',
        body: this.$el,
        save_label: 'Save',
        show_remove_button: (this.mode == 'edit')
      });
      this.listenTo(modal_view, 'save', this.save);
      this.listenTo(modal_view, 'remove', this._remove);
      modal_view.listenTo(this, 'save remove', modal_view.hide);
      this.listenTo(modal_view, 'close', function() {
        // Cleanup
        //modal_view.remove();
        //$('.modal').remove();
        //this.close();
      });
    },
    
    save: function() {
      var errors = this.form.commit(),
          obj    = this;
      if (!errors) {
        this.model.save(this.model.attributes, {
          wait: true,
          success: _.bind(obj.trigger, obj, 'save'),
          error:   _.bind(this.showServerError, this)
        });
      } else {
        this.showServerError();
      }
    },

    _remove: function() {
      var obj = this;
      dialog.confirm({
        message: 'Are you sure you want to remove this?',
        callback: function(value) {
          if (value) {
            obj.model.destroy({
              wait: true,
              success: _.bind(obj.trigger, obj, 'remove'),
              error: _.bind(obj.showServerError, obj)
            });
          }
        }
      });
    },

    onClose: function() {
    }

  });
});
