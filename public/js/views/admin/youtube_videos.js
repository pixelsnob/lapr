/**
 * Youtube Videos view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/youtube_video'
], function(
  BaseView,
  AdminListMixin,
  YoutubeVideoView
) {

  var view = BaseView.extend({
    
    view: YoutubeVideoView,
    
    title: 'Youtube Videos',
    
    initialize: function(opts) {
      
    }
  });

  return view.mixin(AdminListMixin);
    
});

