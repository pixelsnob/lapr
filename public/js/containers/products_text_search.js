
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, slots = {}) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');


    events.once('connected', this.connected.bind(this));
  }

  connected($el) {
    const $input = $el.querySelector('#search1');
    if (!$input.attached) {
      $input.addEventListener('keyup', this.keyup.bind(this));
      $input.addEventListener('blur', this.blur.bind(this));
      $input.attached = true;
    }
  }

  keyup(ev) {
    this.store.products.createProductsIndex();
    const products_results = this.store.products.getSearchResults(ev.target.value, 50); // limit?
    console.log(products_results);
    // render list
  }

  blur(ev) {
    // hide list
  }

  render() {
    this.$el.innerHTML = template.render('partials/products_text_search');
    return this.$el.content.cloneNode(true);
  }
}

