
'use strict';

var _        = require('underscore');

module.exports = function(app) {
  // Human readable file sizes
  app.locals.bytesToSize = function(bytes) {
    if (bytes == 0) {
      return '0 Bytes';
    }
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  };
};
