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
      this.listenTo(this, 'reader-loaded', this.setImageSrc);
      this.listenTo(this, 'delete-file', this.hideImage);
    },

    render: function() {
      FileUploadView.prototype.render.apply(this, arguments);
      var src = '/images/' + this.model.get(this.key),
          img = $('<img>').attr('src', src).width(200);
      this.$preview.html(img);
      this.showImage();
      return this;
    },

    showImage: function() {
      if (this.getValue().length) {
        this.$preview.find('img').show();
      } else {
        this.$preview.find('img').hide();
      }
    },

    hideImage: function() {
      this.$preview.find('img').hide();
    },

    setImageSrc: function(reader) {
      if (reader.result) {
        this.$preview.find('img').attr('src', reader.result).show();
      }
    }
    
  });
});
