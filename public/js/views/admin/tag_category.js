/**
 * tag_category view
 * 
 */
define([
  'views/base',
  'models/tag_category',
  'forms/tag_category',
  'views/admin/form_mixin'
], function(
  BaseView,
  TagCategoryModel,
  TagCategoryForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    label: 'tag category',
    title: 'Tag Category',
    model: new TagCategoryModel,
    initialize: function(opts) {
      this.form = new TagCategoryForm({
        model:      this.model,
        collection: this.collection
      });
    }
  });

  return view.mixin(AdminFormMixin);
});

