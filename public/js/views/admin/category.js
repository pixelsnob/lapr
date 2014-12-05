/**
 * product_category view
 * 
 */
define([
  'views/base',
  'cms/views/modal/form',
  'forms/category',
  'models/product_category',
  'template',
  'lib/dialog'
], function(
  BaseView,
  ModalFormView,
  CategoryForm,
  CategoryModel,
  template,
  dialog
) {
  
  return BaseView.extend({
    
    model: new CategoryModel,

    tagName: 'tr',

    events: {
      'click .edit':    'renderEditForm'
    },
    
    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'save', this.render);
      this.form = new CategoryForm({ model: this.model });
    },

    render: function() {
      this.$el.append(template.render('admin/category', this.model.toJSON())); 
      return this;
    },

    renderEditForm: function(ev) {
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        body: this.form.render().el,
        show_remove_button: true
      });
      this.listenTo(modal_view, 'save', this.save);
      this.listenTo(modal_view, 'remove', this.destroy);
      modal_view.listenTo(this, 'save destroy', modal_view.hide);
    },

    renderAddForm: function(ev) {
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
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
      var obj = this;
      dialog.confirm({
        message: 'Are you sure you want to remove this category?',
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

  });
});
