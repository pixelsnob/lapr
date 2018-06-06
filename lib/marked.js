/**
 * Configure marked (markdown interpreter) and add directly to app.locals
 * 
 */
'use strict';

// move this to front-end?
var marked = require('marked');

module.exports = app => {
  app.locals.marked_opts = {
    gfm: true,
    breaks: true,
    tables: true,
    sanitize: true, 
    smartypants: true
  };
  marked.setOptions(app.locals.marked_opts);
  app.locals.markdown = marked;
};

