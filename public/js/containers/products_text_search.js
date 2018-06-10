
import template from 'lib/template';

export default class {
  
  constructor(context, store, slots = {}) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = template.render('partials/products_text_search');
    return this.$el.content.cloneNode(true);
  }
}

