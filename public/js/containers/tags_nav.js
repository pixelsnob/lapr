
import template from 'lib/template';
import TagsNavCategoryList from 'containers/tags_nav_category_list';
//import TagsNavItem from 'components/tags_nav_item';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    // use context params for props?
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
    this.events = events;
  }

  render() {
    this.$el.innerHTML = template.render('partials/tags_nav');
    const $ul = this.$el.content.querySelector('ul');
    this.store.refs.tag_categories.models.forEach(model => {
      const tag_category = new TagsNavCategoryList(this.context, model.toJSON());
      $ul.appendChild(tag_category.render());
    });
    return this.$el.content.cloneNode(true);
  }
}
