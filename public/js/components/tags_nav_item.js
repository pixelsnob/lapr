
import template from 'lib/template';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = template.render('partials/tags_nav_item', {
      tag: this.context.params.tag
    });
    return this.$el.content.cloneNode(true);
  }
}
