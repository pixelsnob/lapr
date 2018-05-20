/**
 * Image upload custom editor
 * 
 */
import FileUploadView from './base';
import ImageModel from 'models/file/image';

export default FileUploadView.extend({

  image_path: '/images/products/',

  file_model: ImageModel,

  initialize: function() {
    FileUploadView.prototype.initialize.apply(this, arguments);
    this.listenTo(this, 'reader-loaded', this.setImageSrc);
    this.listenTo(this, 'delete-file', this.onDelete);
  },

  render: function() {
    FileUploadView.prototype.render.apply(this, arguments);
    var src = this.image_path + this.model.get(this.key),
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

  onDelete: function() {
    this.setValue('');
    this.$preview.find('img').hide();
    this.$file_input.val('');
    this.$hidden_input.val('');
    this.model.set('tmp_' + this.key, '', {
      silent: true
    });
  },

  setImageSrc: function(reader) {
    if (reader.result) {
      this.$preview.find('img').attr('src', reader.result).show();
    }
  }

});
