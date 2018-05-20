/**
 * product view
 * 
 */
import BaseView from 'views/base';
import ProductModel from 'models/product';
import ModalFormView from './modal/form';
import ProductForm from 'forms/product';
import dialog from 'lib/dialog';

export default BaseView.extend({

  events: {},

  initialize: function(opts) {
    this.model = opts.model || new ProductModel;
    this.refs = opts.refs;
    this.mode = opts.mode || 'edit';
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
    var modal_view = new ModalFormView({
      form: this.form
    });
    modal_view.modal({
      title: 'Edit Product',
      body: this.$el,
      save_label: 'Save',
      show_remove_button: (this.mode == 'edit')
    });
    this.listenTo(modal_view, 'save', this.save);
    this.listenTo(modal_view, 'remove', this._remove);
    modal_view.listenTo(this, 'save remove', modal_view.hide);
  },

  save: function() {
    var errors = this.form.commit();
    if (!errors) {
      this.model.save(this.model.attributes, {
        wait: true,
        success: _.bind(this.trigger, this, 'save'),
        error: _.bind(this.showServerError, this)
      });
    } else {
      this.showServerError();
    }
  },

  _remove: function() {
    dialog.confirm({
      message: 'Are you sure you want to remove this?',
      callback: value => {
        if (value) {
          this.model.destroy({
            wait: true,
            success: _.bind(this.trigger, this, 'remove'),
            error: _.bind(this.showServerError, this)
          });
        }
      }
    });
  },

  onClose: function() {}

});
