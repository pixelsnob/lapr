/**
 * image view
 * 
 */
define([
  'views/base',
  'models/image',
  'forms/image',
  'views/admin/form_mixin'
], function(
  BaseView,
  ImageModel,
  ImageForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    label: 'image',
    title: 'Image',
    model: new ImageModel,
    
    initialize: function() {
      this.form = new ImageForm({
        model:      this.model,
        collection: this.collection
      });
    },

    render: function() {
      this.$el.append(template.render('admin/image_list_item', this.model.toJSON())); 
      console.log('r');
      return this;
    },
  });

  return view.mixin(AdminFormMixin);
});

