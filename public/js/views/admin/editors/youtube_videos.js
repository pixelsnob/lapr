/**
 * Tags multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/youtube_videos',
  'backbone-forms'
], function(
  Backbone,
  MultiSelectEditorView,
  YoutubeVideosView
) {
  return MultiSelectEditorView.extend({
    
    list_view: YoutubeVideosView

  });
});
