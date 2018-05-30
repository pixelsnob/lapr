
'use strict';

const db = require('../models');
const cache = require('memory-cache');

module.exports = async (req, res, next) => {

  const cached_data = cache.get('json_data');
  const nocache = typeof req.query.nocache != 'undefined';

  if (req.isAuthenticated() || nocache || !cached_data) {
    let data = {};
    const model_names = {
      'products':            'Product',
      'product_categories':  'ProductCategory',
      'makers':              'Maker',
      'tags':                'Tag',
      'tag_categories':      'TagCategory',
      'youtube_videos':      'YoutubeVideo',
      'images':              'Image'
    }; 
    for (let model_name of Object.keys(model_names)) {
      const docs = await db.model(model_names[model_name]).find(
        {},
        { __v: 0 },
        { sort: { name: 1 }}
      );
      data[model_name] = docs.map(doc => {
        // Send only fields that are in the model
        var fields = Object.keys(db.model(model_names[model_name]).schema.paths);
        var new_doc = {};
        fields.forEach(field => {
          if (typeof doc[field] != 'undefined') {
            new_doc[field] = doc[field];
          }
        });
        return new_doc;
      });
    }
    res.locals.json_data = data;
    cache.put('json_data', data, (1000 * 60 * 60));
    next();
  } else {
    res.locals.json_data = cached_data;
    next(); 
  }
};


