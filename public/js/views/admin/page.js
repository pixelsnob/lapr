/**
 * page view
 * 
 */
define([
  'views/base',
  'models/page',
  'forms/page',
  'views/admin/form_mixin'
], function(
  BaseView,
  PageModel,
  PageForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    label: 'page',
    title: 'Page',
    model: new PageModel,
    initialize: function() {
      this.form = new PageForm({
        model:      this.model,
        collection: this.collection
      });
    }
  });

  return view.mixin(AdminFormMixin);
});

