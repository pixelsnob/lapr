/**
 * Image model
 * 
 */
define([
  './base'
], function(FileModel) {
  return FileModel.extend({
    
    upload_url: '/files/tmp',

    types: [ 'image/jpeg', 'image/png' ],
    
    validate: function(attrs, opts) {
      if (!attrs.file.name.match(/^[a-z0-9\-\._]+$/i)) {
        return 'Illegal characters';
      }
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'Image must be one of: ' + this.types.join(', ');
      }
      if (attrs.file.size > 125000) {
        return 'Image size must be less than 250KB';
      }
    }
  });
});

