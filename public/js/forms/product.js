/**
 * product form
 * 
 */
define([
  'backbone',
  'backbone-forms',
  '../collections/product_categories',
  '../collections/makers',
  'views/forms/editors/multi_select',
  'views/forms/editors/file/image',
  'views/forms/editors/file/thumbnail',
  'views/forms/editors/file/sound_file',
  'views/forms/templates',
  'form-editors/list'
], function(
  Backbone,
  BackboneForms,
  ProductCategories,
  Makers,
  MultiSelectEditor,
  ImageEditor,
  ThumbnailEditor,
  SoundFileEditor,
  form_templates
) {
  
  return Backbone.Form.extend({

    initialize: function(opts) {
      Backbone.Form.prototype.initialize.apply(this, arguments);
      this.fields.categories.schema.options = opts.product_categories;
      this.fields.makers.schema.options     = opts.makers;
      this.fields.tags.schema.options       = opts.tags
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
        type: MultiSelectEditor,
        validators: [ 'required' ],
        options: [], // set in init
        template: form_templates.editable_field
      },
      model_no: {
        title: 'Model No.',
        type: 'Text'
      },
      makers: {
        type: MultiSelectEditor,
        template: form_templates.editable_field,
        options: [] // set in init
      },
      tags: {
        title: 'Tags',
        type: MultiSelectEditor,
        template: form_templates.editable_field,
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
        type: ThumbnailEditor
      },
      image: {
        type: ImageEditor
      },
      sound_file: {
        type: SoundFileEditor
      }
    }
  });
});


