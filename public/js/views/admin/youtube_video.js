/**
 * Youtube video view
 * 
 */
define([
  'views/base',
  'models/youtube_video',
  'forms/youtube_video',
  'views/admin/form_mixin'
], function(
  BaseView,
  YoutubeVideoModel,
  YoutubeVideoForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    label: 'youtube video',
    title: 'Youtube Video',
    model: new YoutubeVideoModel,
    initialize: function() {
      this.form = new YoutubeVideoForm({
        model:      this.model,
        collection: this.collection
      });
    }
  });

  return view.mixin(AdminFormMixin);
});

