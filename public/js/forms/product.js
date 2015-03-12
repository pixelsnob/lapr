/**
 * product form
 * 
 */
define([
  'forms/base',
  './editors/multi_select',
  './editors/product_categories',
  './editors/makers',
  './editors/tags',
  './editors/youtube_videos',
  './editors/file/image'
], function(
  BaseForm,
  MultiSelectEditor,
  ProductCategoriesEditor,
  MakersEditor,
  TagsEditor,
  YoutubeVideosEditor,
  ImageEditor
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      BaseForm.prototype.initialize.apply(this, arguments);
      this.fields.categories.schema.options     = opts.refs.product_categories;
      this.fields.makers.schema.options         = opts.refs.makers;
      this.fields.tags.schema.options           = opts.refs.tags;
      this.fields.tags.schema.tag_categories    = opts.refs.tag_categories;
      this.fields.youtube_videos.schema.options = opts.refs.youtube_videos;
    },
    
    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      description: {
        type: 'TextArea'
      },
      alt_names: {
        type: 'Text',
        title: 'Alternate Names'
      },
      categories: {
        type: ProductCategoriesEditor,
        validators: [ 'requiredArray' ],
        options: []
      },
      model_no: {
        title: 'Model No.',
        type: 'Text'
      },
      makers: {
        type: MakersEditor,
        options: []
      },
      tags: {
        title: 'Tags',
        type: TagsEditor,
        options: []
      },
      price: {
        type: 'Text'
      },
      range: {
        type: 'Text',
        validators: [ 'musicNotation' ],
        help: '<em>Comma-separated list of notes and note ranges. Valid example: C#2, Bb3-C7</em>'
      },
      sizes: {
        type: 'TextArea'
      },
      thumbnail: { 
        title: 'Thumbnail',
        type: ImageEditor
      },
      image: { 
        type: ImageEditor
      },
      youtube_videos: {
        type: YoutubeVideosEditor,
        title: 'Youtube Videos',
        options: []
      }
    }
  });
});


