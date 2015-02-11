/**
 * Image thumbnail upload custom editor
 * 
 */
define([
  './base',
  'models/file/thumbnail'
], function(
  FileUploadView,
  ThumbnailModel
) {
  
  return FileUploadView.extend({
    
    file_model: ThumbnailModel,

    initialize: function() {
      FileUploadView.prototype.initialize.apply(this, arguments); 
      this.listenTo(this, 'reader_loaded', this.showPreview);
    },

    render: function() {
      FileUploadView.prototype.render.apply(this, arguments);
      var src = '/images/products/thumbnails/' + this.model.get(this.key),
          img = $('<img>').attr('src', src).width(200);
      this.$preview.html(img);
      return this;
    },

    showPreview: function(reader) {
      if (reader.result) {
        this.$preview.find('img').attr('src', reader.result);
      }
    }
    
  });
});
