/**
 * product_category view
 * 
 */
define([
  'views/base',
  'cms/views/modal/form',
  'forms/category',
  'template',
  'lib/dialog'
], function(
  BaseView,
  ModalFormView,
  CategoryForm,
  template,
  dialog
) {
  
  return BaseView.extend({
    
    tagName: 'tr',

    events: {
      'click .edit':      'edit',
      'click .remove':    'destroy' 
    },
    
    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'save', this.render);
    },

    render: function() {
      this.$el.append(template.render('admin/category', this.model.toJSON())); 
      return this;
    },

    edit: function(ev) {
      this.form = new CategoryForm({ model: this.model });
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        body: this.form.render().el
      });
      this.listenTo(modal_view, 'save', this.save);
      modal_view.listenTo(this, 'save', modal_view.hide);
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
        message: 'Are you sure you want to do this? Any products linked to ' +
                 'this category will need to be reassigned.',
        callback: function(value) {
          if (value) {
            obj.model.destroy({
              wait: true,
              error:   _.bind(obj.showServerError, obj)
            });
          }
        }
      });
    }

  });
});
