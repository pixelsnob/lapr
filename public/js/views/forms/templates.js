/**
 * Various backbone-forms template overrides
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(Backbone) {
  return {
    // Adds an edit/new link
    editable_field: _.template('\
      <div>\
        <label for="<%= editorId %>">\
          <%- title %>\
        </label>\
        <div>\
          <span data-editor></span>\
          <ul>\
            <li><a href="javascript:void(0);" class="add-<%= key %>">Add</a></li>\
            <li><a href="javascript:void(0);" class="edit-<%= key %>">Edit</a></li>\
          </ul>\
          <div data-error></div>\
          <div><%= help %></div>\
        </div>\
      </div>\
    ')
  };
});
