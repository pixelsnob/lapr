/**
 * product_categories view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/category'
], function(
  BaseView,
  AdminListMixin,
  CategoryView
) {

  var view = BaseView.extend({
    view: CategoryView,
    title: 'Product Categories',
    events: {
    },
    initialize: function(opts) {
    }
  });

  return view.mixin(AdminListMixin);

});
