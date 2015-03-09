/**
 * page view
 * 
 */
define([
  './base',
  'models/page',
  'forms/page'
], function(
  ListItemBaseView,
  PageModel,
  PageForm,
  AdminFormMixin
) {
  
  return ListItemBaseView.extend({
    label: 'page',
    title: 'Page',
    model: new PageModel,
    initialize: function() {
      this.form = new PageForm({
        model:      this.model,
        collection: this.collection
      });
    }
  });
});

