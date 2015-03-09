/**
 * Tags multiselect
 * 
 * 
 */
define([
  'backbone',
  './multi_select',
  'views/admin/lists/youtube_videos',
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
