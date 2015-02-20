/**
 * Sound file upload editor
 * 
 */
define([
  './base',
  'models/file/sound_file'
], function(
  FileUploadView,
  SoundFileModel
) {
  
  return FileUploadView.extend({
    
    file_model: SoundFileModel,

    initialize: function() {
      FileUploadView.prototype.initialize.apply(this, arguments); 
      this.listenTo(this, 'reader_loaded', this.showPreview);
    },

    render: function() {
      FileUploadView.prototype.render.apply(this, arguments);
      this.$preview.text(this.model.get(this.key));
      return this;
    },

    showPreview: function(reader) {
      var file = this.file_model.get('file');
      if (reader.result && file.name) {
        this.$preview.text(file.name);
      }
    }
    
  });
});
