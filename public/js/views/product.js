/**
 * product view
 * 
 */
define([
  'cms/views/base',
  'cms/views/modal/form',
  '../models/product',
  '../forms/product'
], function(BaseView, ModalFormView, ProductModel, ProductForm) {
  return BaseView.extend({

    model: new ProductModel,
    events: {
      'click .remove': 'remove',
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
      //this.$el.append($('<a>').addClass('remove').text('Remove'));
      modal_view.modal({
        title: 'Edit Product',
        body: this.$el,
        save_label: 'Save',
        show_remove: true
      });
      this.listenTo(modal_view, 'save', this.save);
      modal_view.listenTo(this, 'save', modal_view.hide);
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
        success: _.bind(this.trigger, this, 'save'),
        error: _.bind(this.showServerError, this)
      });
    }

  });
});
