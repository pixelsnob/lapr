/**
 * page view
 * 
 */
define([
  './base',
  'models/page',
  'forms/page',
  'template'
], function(
  ListItemBaseView,
  PageModel,
  PageForm,
  template
) {
  
  return ListItemBaseView.extend({
    label: 'page',
    title: 'Page',
    
    model: new PageModel,
    
    form_obj: PageForm,

    render: function() {
      this.$el.append(template.render('admin/page_list_item', this.model.toJSON())); 
      return this;
    }

    
  });
});

