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
  './editors/file/product_image'
], function(
  BaseForm,
  MultiSelectEditor,
  ProductCategoriesEditor,
  MakersEditor,
  TagsEditor,
  YoutubeVideosEditor,
  ProductImageEditor
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
      price_label: {
        type: 'Select',
        title: 'Price Label',
        options: [ 'Day', 'Week' ]
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
        type: 'TextArea',
        help: '<em>Markdown enabled</em>'
      },
      image: { 
        type: ProductImageEditor,
        help: '<em>Image must be < 250KB in size, and < 1000px wide. Thumbnails generated automatically</em>'
      },
      youtube_videos: {
        type: YoutubeVideosEditor,
        title: 'Youtube Videos',
        options: []
      },
      hide_sizes_in_lists: {
        type: 'Checkbox',
        title: 'Hide Sizes in List Views'
      },
      include_in_slideshow: {
        type: 'Checkbox',
        title: 'Include in Slideshow'
      },
      show_sounds_disclaimer: {
        type: 'Checkbox',
        title: 'Show Sounds Disclaimer',
        help: '<em>Show disclaimer if product has videos</em>'
      }
    }
  });
});


