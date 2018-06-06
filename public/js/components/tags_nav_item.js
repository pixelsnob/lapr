
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
    this.events = events;
  }

  render() {
    this.$el.innerHTML = template.render('partials/tags_nav_item', {
      tag: this.store
    });
    return this.$el.content.cloneNode(true);
  }
}
