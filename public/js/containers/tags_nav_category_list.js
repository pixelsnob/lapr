
import template from 'lib/template';
import TagsNavItem from 'components/tags_nav_item';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/tags_nav_category_list.jade')({
      tag_category: this.params.tag_category
    });
    const tags = this.store.tags.models.filter(tag => {
      return tag.get('category') == this.params.tag_category._id
    });
    tags.forEach(model => {
      const tags_nav_item = new TagsNavItem({
        ...this.params,
        tag: model.toJSON()
      }, this.store);
      this.$el.content.querySelector('.tags-list').appendChild(tags_nav_item.render());
    });
    return this.$el.content;
  }
}

