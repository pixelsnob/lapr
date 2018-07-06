
import template from 'lib/template';
import TagsNavCategoryList from 'containers/tags_nav_category_list';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/tags_nav.jade')();
    const $ul = this.$el.content.querySelector('ul');
    this.store.tag_categories.models.forEach(model => {
      const tag_category = new TagsNavCategoryList({
        ...this.params,
        tag_category: model.toJSON()
      }, this.store);
      $ul.appendChild(tag_category.render());
    });
    return this.$el.content;
  }
}


