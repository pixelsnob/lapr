/**
 * product view
 * 
 */
define([
  'views/base',
  './categories',
  './makers',
  './tonal_qualities',
  'cms/views/modal/form',
  'models/product',
  'forms/product',
  'lib/dialog'
], function(
  BaseView,
  CategoriesView,
  MakersView,
  TonalQualitiesView,
  ModalFormView,
  ProductModel,
  ProductForm,
  dialog
) {
  return BaseView.extend({

    events: {
      'click .edit-categories':           'editCategories',
      'click .edit-makers':               'editMakers',
      'click .edit-tonal_qualities':      'editTonalQualities'
    },
    
    initialize: function(opts) {
    },
    
    render: function() {
      return this;
    },

    renderModal: function(opts) {
      this.form = new ProductForm({ model: this.model }).render();
      this.setElement(this.form.el);
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Product',
        body: this.$el,
        save_label: 'Save',
        show_remove_button: (opts.mode == 'edit')
      });
      this.listenTo(modal_view, 'save', this.save);
      this.listenTo(modal_view, 'remove', this._remove);
      modal_view.listenTo(this, 'save remove', modal_view.hide);
      // Cause the form to reload options from server next time
      this.listenTo(modal_view, 'close', function() {
        var fields = this.form.fields;
        fields.categories.schema.options.reset();
        fields.makers.schema.options.reset();
        fields.tonal_qualities.schema.options.reset();
      });
    },
    
    editCategories: function() {
      var obj     = this,
          editor  = this.form.getEditor('categories'),
          val     = editor.getValue();
      var view = new CategoriesView({ collection: editor.schema.options });
      view.renderModal();
      editor.listenTo(view, 'close', editor.refresh);
    },

    editMakers: function() {
      var obj     = this,
          editor  = this.form.getEditor('makers'),
          val     = editor.getValue();
      var view = new MakersView({ collection: editor.schema.options });
      view.renderModal();
      editor.listenTo(view, 'close', editor.refresh);
    },

    editTonalQualities: function() {
      var obj     = this,
          editor  = this.form.getEditor('tonal_qualities'),
          val     = editor.getValue();
      var view = new TonalQualitiesView({ collection: editor.schema.options });
      view.renderModal();
      editor.listenTo(view, 'close', editor.refresh);
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
    }

  });
});
