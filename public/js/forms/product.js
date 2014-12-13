/**
 * product form
 * 
 */
define([
  'backbone',
  'backbone-forms',
  '../collections/product_categories',
  '../collections/makers',
  '../collections/tags',
  'views/forms/editors/multi_select',
  'views/forms/templates',
  'form-editors/list'
], function(
  Backbone,
  BackboneForms,
  ProductCategories,
  Makers,
  Tags,
  MultiSelectEditor,
  form_templates
) {
  
  return Backbone.Form.extend({

    initialize: function() {
      Backbone.Form.prototype.initialize.apply(this, arguments);
      // Force ref lists to load each time form is created. Notice empty
      // schema.options below
      this.fields.categories.schema.options = new ProductCategories;
      this.fields.makers.schema.options = new Makers;
      this.fields.tags.schema.options = new Tags;
      $.when(
        this.fields.categories.schema.options.fetch,
        this.fields.makers.schema.options.fetch,
        this.fields.tags.schema.options.fetch
      ).fail(
        _.bind(this.trigger, this, 'init-error')
      );
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
        options: []
      },
      tags: {
        title: 'Tags',
        type: MultiSelectEditor,
        template: form_templates.editable_field,
        options: []
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


