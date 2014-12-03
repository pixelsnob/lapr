/**
 * product view
 * 
 */
define([
  'views/base',
  'views/modal/form',
  'models/product',
  'forms/product',
  'lib/dialog'
], function(BaseView, ModalFormView, ProductModel, ProductForm, dialog) {
  return BaseView.extend({

    model: new ProductModel,
    events: {
      'click .edit-categories': 'editCategories'
    },
    
    initialize: function(opts) {
      
    },
    
    render: function() {
      return this;
    },

    renderModalForm: function() {
      this.form = new ProductForm({ model: this.model }).render();
      this.setElement(this.form.el);
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Product',
        body: this.$el,
        save_label: 'Save',
        show_remove: true
      });
      this.listenTo(modal_view, 'save', this.save);
      this.listenTo(modal_view, 'remove', this.remove);
      modal_view.listenTo(this, 'save remove', modal_view.hide);
      modal_view.listenTo(this, 'remove', _.bind(dialog.alert, dialog, 'Removed'));
    },
    
    editCategories: function() {
      var obj     = this,
          editor  = this.form.getEditor('categories'),
          val     = editor.getValue();
  
      editor.schema.options.fetch().done(function() {
        editor.render().setValue(val);
        console.log('hory shet');
      });
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
      this.model.destroy({
        wait: true,
        success: _.bind(this.trigger, this, 'remove'),
        error: _.bind(this.showServerError, this)
      });
    }

  });
});
