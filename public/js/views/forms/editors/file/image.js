/**
 * Image upload custom editor
 * 
 */
define([
  './base',
  'models/file/image'
], function(
  FileUploadView,
  ImageModel
) {
  
  return FileUploadView.extend({
    
    file_model: ImageModel,

    initialize: function() {
      FileUploadView.prototype.initialize.apply(this, arguments); 
      this.listenTo(this, 'reader_loaded', this.showPreview);
    },

    render: function() {
      FileUploadView.prototype.render.apply(this, arguments);
      var src = '/images/' + this.model.get(this.key),
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
