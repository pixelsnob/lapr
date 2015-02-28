/**
 * product form
 * 
 */
define([
  'backbone',
  'backbone-forms',
  'views/admin/editors/multi_select',
  'views/admin/editors/product_categories',
  'views/admin/editors/makers',
  'views/admin/editors/tags',
  'views/admin/editors/youtube_videos',
  'views/admin/editors/file/image'
], function(
  Backbone,
  BackboneForms,
  MultiSelectEditor,
  ProductCategoriesEditor,
  MakersEditor,
  TagsEditor,
  YoutubeVideosEditor,
  ImageEditor
) {
  
  return Backbone.Form.extend({

    initialize: function(opts) {
      Backbone.Form.prototype.initialize.apply(this, arguments);
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
        validators: [ 'required' ],
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
        validators: [
          function(value, form_values) {
            var err = {
              //type: 'range',
              message: 'Range must look like A2-C#3 and Bb4, D3 for individual notes'
            };
            //var parsed = /^[a-g](?:#{1,2}|b{1,2})?[1-8]/i.exec(r);
            return err;

          }
        ]
      },
      sizes: {
        type: 'TextArea'
      },
      thumbnail: { 
        type: ImageEditor,
        options: []
      },
      image: { 
        type: ImageEditor,
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


