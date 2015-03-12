/**
 * Youtube video view
 * 
 */
define([
  './base',
  'models/youtube_video',
  'forms/youtube_video'
], function(
  ListItemBaseView,
  YoutubeVideoModel,
  YoutubeVideoForm
) {
  
  return ListItemBaseView.extend({
    label: 'youtube video',
    title: 'Youtube Video',
    
    model: new YoutubeVideoModel,
    
    createForm: function() {
      this.form = new YoutubeVideoForm({
        model:      this.model,
        collection: this.collection
      });
    }
  });
  
});

