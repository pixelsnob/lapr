
import template from 'lib/template';
import HeadContainer from 'containers/head';
import ProductsTextSearchContainer from 'containers/products_text_search';

export default class {
  
  constructor(context, store, slots = {}) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');

    this.head_container = new HeadContainer(this.context, this.store);
    //this.products_text_search_container = new ProductsTextSearchContainer(this.context, this.store);

    if (window.__lapr_ssr && !document.head.attached) {
      document.head.appendChild(this.head_container.render().cloneNode(true));
      document.head.attached = true;
    }

  }

  render() {
    this.$el.innerHTML = template.render('partials/body');
    //this.$el.content.querySelector('.text-search').appendChild(
    //  this.products_text_search_container.render()
    //);
    if (this.slots.main) {
      this.$el.content.querySelector('#main').appendChild(this.slots.main.render());
    }
    return this.$el.content.cloneNode(true);
  }
}

