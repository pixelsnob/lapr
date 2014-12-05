/**
 * product_categories view
 * 
 */
define([
  'views/base',
  'views/mixins/admin_list',
  'views/admin/category',
  'lib/view_mixin'
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
