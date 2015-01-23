/**
 * tag_category view
 * 
 */
define([
  'views/base',
  'models/tag_category',
  'forms/tag_category',
  'views/mixins/admin_form'
], function(
  BaseView,
  TagCategoryModel,
  TagCategoryForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    tagName: 'tr',
    label: 'tag category',
    title: 'Tag Category',
    model: new TagCategoryModel,
    initialize: function() {
      this.form = new TagCategoryForm({ model: this.model });
    }
  });

  return view.mixin(AdminFormMixin);
});

