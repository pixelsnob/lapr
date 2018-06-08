
import template from 'lib/template';
import TagsNavCategoryList from 'containers/tags_nav_category_list';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = template.render('partials/tags_nav');
    const $ul = this.$el.content.querySelector('ul');
    this.store.refs.tag_categories.models.forEach(model => {
      const context = {
        ...this.context,
        params: {
          ...this.context.params,
          tag_category: model.toJSON()
        }
      }; 
      const tag_category = new TagsNavCategoryList(context, this.store);
      $ul.appendChild(tag_category.render());
    });
    return this.$el.content.cloneNode(true);
  }
}


