/**
 * Admin form mixin
 * 
 */
import BaseView from 'views/base';
import ModalFormView from 'views/admin/modal/form';
import template from 'template';
import dialog from 'lib/dialog';

export default BaseView.extend({

  tagName: 'tr',

  events: {
    'click .edit': 'renderEditForm'
  },

  initialize: function() {
    //this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.append(template.render('admin/list_item', this.model.toJSON()));
    return this;
  },

  renderEditForm: function(ev) {
    this.createForm();
    var modal_view = new ModalFormView({
      form: this.form
    });
    modal_view.modal({
      title: 'Edit ' + this.title,
      body: this.form.render().el,
      show_remove_button: true
    });
    this.listenTo(modal_view, 'save', this.save);
    this.listenTo(modal_view, 'remove', this.destroy);
    modal_view.listenTo(this, 'save destroy', modal_view.hide);
    this.listenTo(modal_view, 'close', function() {
      modal_view.remove();
    });
  },

  renderAddForm: function(ev) {
    this.createForm();
    var modal_view = new ModalFormView({
      form: this.form
    });
    modal_view.modal({
      title: 'Add ' + this.title,
      body: this.form.render().el
    });
    this.listenTo(modal_view, 'save', this.save);
    modal_view.listenTo(this, 'save', modal_view.hide);
    this.on('save', _.bind(this.trigger, this, 'add'));
  },

  save: function() {
    var errors = this.form.commit(),
      obj = this;
    if (!errors) {
      this.model.save(this.form.getValue(), {
        wait: true,
        success: function(model) {
          obj.trigger('save', model);
        },
        error: _.bind(this.showServerError, this)
      });
    } else {
      this.showServerError();
    }
  },

  destroy: function(ev) {
    var obj = this,
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
  },

  createForm: function() {
    this.form = new this.form_obj({
      model: this.model,
      collection: this.collection,
      refs: this.collection.refs
    });
  },

  onClose: function() {}

});

