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
      this.form = new ImageForm({ model: this.model });
      this.listenTo(this.model, 'remove', function(model) {
        console.log('remove');
      });
    }

  });

  return view.mixin(AdminFormMixin);
});

