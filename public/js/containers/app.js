
import template from 'lib/template';
//import HeadContainer from 'containers/head';
import ProductsTextSearchContainer from 'containers/products_text_search';
import events from 'events/app';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');

    //this.head_container = new HeadContainer(this.context, this.store);

    events.once('connected', this.connected.bind(this));
  }

  connected($el) {
    const products_text_search_container = new ProductsTextSearchContainer(
      this.context,
      this.store
    );
    products_text_search_container.render();
    products_text_search_container.connected(document.body);
  }

  render() {
    //document.body.innerHTML = template.render('partials/body');
  }
}

