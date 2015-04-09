
'use strict';

var _        = require('underscore'),
    jade     = require('jade');

module.exports = function(app) {
  // Outputs a cms content block
  /*app.locals.outputContentBlock = function(name, content_blocks) {
    var content_block = _.find(content_blocks, { name: name });
    if (content_block) {
      var content = content_block.content;
      if (content_block.type == 'markdown') {
        content = app.locals.markdown(content);
      }
      return jade.renderFile('./views/partials/content_block.jade', {
        content: content,
        name:    content_block.name
      });
    }
  };*/
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
