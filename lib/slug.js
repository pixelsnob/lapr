/**
 * Global slug generator
 * 
 */
'use strict';

var slug = require('slug');

module.exports = str => {
  return slug(str).toLowerCase();
};

