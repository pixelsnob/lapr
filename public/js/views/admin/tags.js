/**
 * tags view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
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
