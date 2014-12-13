/**
 * tag view
 * 
 */
define([
  'views/base',
  'models/tag',
  'forms/tag',
  'views/mixins/admin_form'
], function(
  BaseView,
  TagModel,
  TagForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    tagName: 'tr',
    label: 'tag',
    title: 'Tag',
    model: new TagModel,
    initialize: function() {
      this.form = new TagForm({ model: this.model });
    }
  });

  return view.mixin(AdminFormMixin);
});

