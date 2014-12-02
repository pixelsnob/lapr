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
  'views/forms/editors/images'
], function(
  Backbone,
  BackboneForms,
  ProductCategories,
  Makers,
  MultiSelectEditor,
  ImagesEditor
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
        type: 'Text'
      },
      categories: {
        type: MultiSelectEditor,
        validators: [ 'required' ],
        options: new ProductCategories,
        template: _.template('\
          <div>\
            <label for="<%= editorId %>">\
              <%- title %>\
            </label>\
          <div>\
            <span data-editor></span>\
            <a href="javascript:void(0);" class="edit-categories">Edit</a>\
            <div data-error></div>\
            <div><%= help %></div>\
          </div>\
        </div>\
        ')
      },
      model_no: {
        type: 'Text'
      },
      makers: {
        type: MultiSelectEditor,
        options: new Makers
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
      alt_names: {
        type: 'Text'
      },
      images: {
        type: 'Images'
      }
    }
    
  });
});


