/**
 * product_category view
 * 
 */
define([
  'views/base',
  'models/product_category',
  'forms/category',
  'views/admin/form_mixin'
], function(
  BaseView,
  CategoryModel,
  CategoryForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    //tagName: 'tr',
    label: 'category',
    title: 'Category',
    model: new CategoryModel,
    initialize: function() {
      this.form = new CategoryForm({ model: this.model });
    }
  });

  return view.mixin(AdminFormMixin);
});

