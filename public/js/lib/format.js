/**
 * Text formatting functions, etc.
 * 
 */
define([], function() {
  // Human readable file sizes
  return {
    bytesToSize: function(bytes) {
      if (!bytes && bytes != 0) {
        return '-';
      }
      if (bytes == 0) {
        return '0 Bytes';
      }
      var k = 1000;
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.floor(bytes / Math.pow(k, i)) + sizes[i];
    }
  };
});
