/**
 * content_block view
 * 
 */
import BaseView from 'views/base';
import ContentBlockModel from 'models/content_block';
import ModalFormView from './modal/form';
import ContentBlockForm from 'forms/content_block';
import dialog from 'lib/dialog';

export default BaseView.extend({

  events: {},

  initialize: function(opts) {},

  render: function() {
    this.form = new ContentBlockForm({
      model: this.model,
      check_unique: false,
      name_disabled: true
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
      title: 'Edit Content Block',
      body: this.$el
    });
    this.listenTo(modal_view, 'save', this.save);
    modal_view.listenTo(this, 'save', modal_view.hide);
  },

  save: function() {
    var errors = this.form.commit();
    if (!errors) {
      this.trigger('save');
    }
  }

});
