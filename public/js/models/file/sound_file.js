/**
 * Sound file model
 * 
 */
define([
  './base'
], function(FileModel) {

  return FileModel.extend({
    
    upload_url: '/files/tmp',

    types: [ 'audio/mp3' ],
    
    validate: function(attrs, opts) {
      if (!attrs.file.name.match(/^[a-z0-9\-\._]+$/i)) {
        return 'Illegal characters';
      }
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'File must be one of: ' + this.types.join(', ');
      }
      if (attrs.file.size > 5000000) {
        return 'Sound file size must be less than 5MB';
      }
    }
  });
});
