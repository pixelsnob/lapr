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
    
    initialize: function(opts) {
      MultiSelectEditorView.prototype.initialize.apply(this, arguments);
    },

    edit: function() {
      // Youtube videos list needs products collection
      var view = new YoutubeVideosView({
        collection: this.schema.options,
        products:   this.model.collection
      });
      view.renderModal();
      this.listenTo(view, 'close', this.refresh);
    }

  });
});
