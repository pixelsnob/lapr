/**
 * product form
 * 
 */
define([
  'backbone',
  'backbone-forms',
  '../collections/product_categories',
  '../collections/makers',
  '../collections/tonal_qualities',
  'views/forms/editors/multi_select',
  'views/forms/templates',
  'form-editors/list'
], function(
  Backbone,
  BackboneForms,
  ProductCategories,
  Makers,
  TonalQualities,
  MultiSelectEditor,
  form_templates
) {
  
  return Backbone.Form.extend({

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
        options: new ProductCategories,
        template: form_templates.editable_field
      },
      model_no: {
        title: 'Model No.',
        type: 'Text'
      },
      makers: {
        type: MultiSelectEditor,
        template: form_templates.editable_field,
        options: new Makers
      },
      tonal_qualities: {
        title: 'Tonal Qualities',
        type: MultiSelectEditor,
        template: form_templates.editable_field,
        options: new TonalQualities
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
      images: {
        type: 'List'
      }
    }
    
  });
});


