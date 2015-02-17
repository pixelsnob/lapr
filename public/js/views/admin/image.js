/**
 * image view
 * 
 */
define([
  'views/base',
  'models/image',
  'forms/image',
  'views/mixins/admin_form'
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
    }

  });

  return view.mixin(AdminFormMixin);
});

