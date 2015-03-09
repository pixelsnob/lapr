/**
 * product form
 * 
 */
define([
  'forms/base',
  'views/admin/editors/multi_select',
  'views/admin/editors/product_categories',
  'views/admin/editors/makers',
  'views/admin/editors/tags',
  'views/admin/editors/youtube_videos',
  'views/admin/editors/images',
  'views/admin/editors/image',
  'collections/images'
  //'views/admin/editors/file/image'
], function(
  BaseForm,
  MultiSelectEditor,
  ProductCategoriesEditor,
  MakersEditor,
  TagsEditor,
  YoutubeVideosEditor,
  ImagesEditor,
  ImageEditor,
  ImagesCollection
  //ImageEditor
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      BaseForm.prototype.initialize.apply(this, arguments);
      this.fields.categories.schema.options     = opts.refs.product_categories;
      this.fields.makers.schema.options         = opts.refs.makers;
      this.fields.tags.schema.options           = opts.refs.tags;
      this.fields.tags.schema.tag_categories    = opts.refs.tag_categories;
      this.fields.youtube_videos.schema.options = opts.refs.youtube_videos;
      this.fields.thumbnail_image.schema.options = opts.refs.images;
      this.fields.images.schema.options          = opts.refs.images;
      var obj = this;
      // Make sure all image lists get updated
      this.listenTo(opts.refs.images, 'add change remove', function() {
        obj.getEditor('images').refresh();
        obj.getEditor('thumbnail_image').refresh();
      });
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
      thumbnail_image: { 
        title: 'Thumbnail',
        type: ImageEditor,
        options: []
      },
      images: { 
        type: ImagesEditor,
        options: []
      },
      youtube_videos: {
        type: YoutubeVideosEditor,
        title: 'Youtube Videos',
        options: []
      }
    }
  });
});


