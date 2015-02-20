/**
 * images view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/image'
], function(
  BaseView,
  AdminListMixin,
  ImageView
) {

  var view = BaseView.extend({
    view: ImageView,
    title: 'Images',
    events: {
    },
    initialize: function(opts) {
    }
  });

  return view.mixin(AdminListMixin);

});
