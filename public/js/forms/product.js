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
  './editors/file/image',
  './editors/file/thumbnail'
], function(
  BaseForm,
  MultiSelectEditor,
  ProductCategoriesEditor,
  MakersEditor,
  TagsEditor,
  YoutubeVideosEditor,
  ImageEditor,
  ThumbnailEditor
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
      slug: {
        type: 'Text'
      },
      description: {
        type: 'TextArea',
        help: '<em>Markdown enabled</em>'
      },
      more_info: {
        type: 'TextArea',
        title: 'More Info',
        help: '<em>Markdown enabled</em>'
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
      octave_shift: {
        type: 'Text',
        validators: [ 'number' ],
        title: 'Octave Shift'
      },
      sizes: {
        type: 'TextArea'
      },
      thumbnail: { 
        type: ThumbnailEditor,
        help: '<em>Thumbnail must be < 50KB in size, and < 180px wide</em>'
      },
      image: { 
        type: ImageEditor,
        help: '<em>Image must be < 225KB in size, and < 1000px wide</em>'
      },
      youtube_videos: {
        type: YoutubeVideosEditor,
        title: 'Youtube Videos',
        options: []
      }
    }
  });
});


