/**
 * tags view
 * 
 */
define([
  'views/base',
  'views/mixins/admin_list',
  'views/admin/tag'
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
