/**
 * Global slug generator
 * 
 */
'use strict';

var slug = require('slug');

module.exports = function(str) {
  return slug(str).toLowerCase();
};

