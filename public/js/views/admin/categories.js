/**
 * product_categories view
 * 
 */
define([
  'views/base',
  'views/admin/category',
  'cms/views/modal/base',
  'cms/views/modal/form',
  'template'
], function(
  BaseView,
  CategoryView,
  ModalView,
  ModalFormView,
  template
) {

  return BaseView.extend({

    events: {
    },
    
    initialize: function(opts) {
      this.setElement(template.render('admin/categories'));
    },
    
    render: function() {
      var obj = this;
      this.collection.each(function(category) {
        var category_view = new CategoryView({ model: category });
        obj.$el.find('table').append(category_view.render().el);
        //console.log(category);
      });
      return this;
    },

    renderModal: function(opts) {
      var modal_view = new ModalView;
      modal_view.modal({
        title: 'Edit Product Categories',
        body: this.render().el,
        save_label: 'Save'
      });
      /*this.form = new ProductForm({ model: this.model }).render();
      this.setElement(this.form.el);
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Product',
        body: this.$el,
        save_label: 'Save',
        show_remove_button: (opts.mode == 'edit')
      });
      this.listenTo(modal_view, 'save', this.save);
      this.listenTo(modal_view, 'remove', this.remove);
      modal_view.listenTo(this, 'save remove', modal_view.hide);
      modal_view.listenTo(this, 'remove', _.bind(dialog.alert, dialog, 'Removed'));*/
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

    remove: function() {
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
    }

  });
});
