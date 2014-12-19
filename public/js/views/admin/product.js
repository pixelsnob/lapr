/**
 * product view
 * 
 */
define([
  'views/base',
  'models/product',
  './categories',
  './makers',
  './tags',
  'cms/views/modal/form',
  'forms/product',
  'lib/dialog'
], function(
  BaseView,
  ProductModel,
  CategoriesView,
  MakersView,
  TagsView,
  ModalFormView,
  ProductForm,
  dialog
) {
  return BaseView.extend({

    events: {
      'click .edit-categories':           'editCategories',
      'click .edit-makers':               'editMakers',
      'click .edit-tags':                 'editTags'
    },
    
    initialize: function(opts) {
      this.model    = opts.model || new ProductModel;
      this.refs     = opts.refs;
      this.mode     = opts.mode || 'edit';
    },
    
    // Build an array of grouped options for backbone-forms
    getTagOptions: function() {
      var tree = [],
          obj  = this;
      this.refs.tag_categories.forEach(function(category) {
        tree.push({
          group:   category.get('name'),
          options: obj.refs.tags.filter(function(tag) {
            return tag.get('category') == category.id;
          }).map(function(tag) {
            return { val: tag.id, label: tag.get('name') };
          })
        });
      });
      return tree; 
    },

    render: function() {
      this.form = new ProductForm({
        model:               this.model,
        product_categories:  this.refs.product_categories,
        makers:              this.refs.makers,
        tags:                this.getTagOptions()
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
        $('.modal').remove();
        this.undelegateEvents();
        this.remove();
      });
    },
    
    editCategories: function() {
      var obj     = this,
          editor  = this.form.getEditor('categories'),
          val     = editor.getValue();
      var view = new CategoriesView({ collection: this.refs.product_categories });
      view.renderModal();
      editor.listenTo(view, 'close', editor.refresh);
    },

    editMakers: function() {
      var obj     = this,
          editor  = this.form.getEditor('makers'),
          val     = editor.getValue();
      var view = new MakersView({ collection: this.refs.makers });
      view.renderModal();
      editor.listenTo(view, 'close', editor.refresh);
    },

    editTags: function() {
      var obj     = this,
          editor  = this.form.getEditor('tags'),
          val     = editor.getValue();
      var view = new TagsView({ collection: this.refs.tags });
      view.renderModal();
      editor.listenTo(view, 'close', function() {
        editor.schema.options = obj.getTagOptions();
        editor.refresh();
      });
    },
    
    save: function() {
      var errors = this.form.commit();
      if (!errors) {
        this.model.save(this.model.attributes, {
          wait: true,
          success: _.bind(this.trigger, this, 'save', this.model),
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
