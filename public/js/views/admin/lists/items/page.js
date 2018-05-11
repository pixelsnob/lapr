/**
 * page view
 * 
 */
import ListItemBaseView from './base';
import PageModel from 'models/page';
import PageForm from 'forms/page';
import template from 'template';

export default ListItemBaseView.extend({
  label: 'page',
  title: 'Page',

  model: new PageModel,

  form_obj: PageForm,

  render: function() {
    this.$el.append(template.render('admin/page_list_item', this.model.toJSON()));
    return this;
  }


});

