
'use strict';

var db = require('mongoose');

var PageSchema = new db.Schema({
  path: { type: String, unique: true, required: true },
  title: { type: String, required: true, default: '' },
  description: { type: String, required: false, default: '' },
  view: { type: String, required: false, default: 'cms/pages/default' },
  body_class: { type: String, default: '' },
  content_blocks: [{ type: Number, ref: 'ContentBlock'  }]
});

module.exports = mai => {
  PageSchema.plugin(mai.plugin, {
    model: 'Page',
    startAt: 1
  });
  return db.model('Page', PageSchema);
};

