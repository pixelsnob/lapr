/**
 * Youtube Videos view
 * 
 */
define([
  './base',
  './items/youtube_video'
], function(
  ListBaseView,
  YoutubeVideoView
) {

  return ListBaseView.extend({
    
    view: YoutubeVideoView,
    title: 'Youtube Videos'
    
  });
    
});

