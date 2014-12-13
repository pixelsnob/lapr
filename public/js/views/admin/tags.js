/**
 * tags view
 * 
 */
define([
  'views/base',
  'views/mixins/admin_list',
  'views/admin/tag',
  'lib/view_mixin'
], function(
  BaseView,
  AdminListMixin,
  TagView
) {

  var view = BaseView.extend({
    view: TagView,
    title: 'Tags',
    events: {
    },
    initialize: function(opts) {
    }
  });

  return view.mixin(AdminListMixin);

});
