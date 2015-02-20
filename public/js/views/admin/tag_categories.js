/**
 * tag_categories view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/tag_category'
], function(
  BaseView,
  AdminListMixin,
  TagCategoryView
) {

  var view = BaseView.extend({
    view: TagCategoryView,
    title: 'Tag Categories',
    events: {
    },
    initialize: function(opts) {
    }
  });

  return view.mixin(AdminListMixin);

});
