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
  'views/admin/editors/file/image'
], function(
  Backbone,
  BackboneForms,
  MultiSelectEditor,
  ProductCategoriesEditor,
  MakersEditor,
  TagsEditor,
  ImageEditor
) {
  
  return Backbone.Form.extend({

    initialize: function(opts) {
      Backbone.Form.prototype.initialize.apply(this, arguments);
      this.fields.categories.schema.options   = opts.refs.product_categories;
      this.fields.makers.schema.options       = opts.refs.makers;
      this.fields.tags.schema.options         = opts.refs.tags;
      this.fields.tags.schema.tag_categories  = opts.refs.tag_categories;
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
        options: [] // set in init
      },
      model_no: {
        title: 'Model No.',
        type: 'Text'
      },
      makers: {
        type: MakersEditor,
        options: [] // set in init
      },
      tags: {
        title: 'Tags',
        type: TagsEditor,
        options: [] // set in init
      },
      price: {
        type: 'Text'
      },
      range: {
        type: 'Text'
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
      youtube_id: {
        type: 'Text',
        title: 'Youtube Video ID'
      },
      youtube_caption: {
        type: 'Text',
        title: 'Youtube Caption'
      }
    }
  });
});


