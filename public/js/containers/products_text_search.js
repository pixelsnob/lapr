
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
  }

  connected($el) {
    const $input = $el.querySelector('#search1');
    $input.addEventListener('keyup', this.keyup.bind(this));
    $input.addEventListener('blur', this.blur.bind(this));
  }

  keyup(ev) {
    const products_results = this.store.products.getSearchResults(ev.target.value, 50); // limit?
    console.log(products_results);
    // render list
  }

  blur(ev) {
    // hide list
  }

  render() {
    this.store.products.createProductsIndex();
    const $text_search_container = document.body.querySelector('.text-search');
    console.log($text_search_container);
    if ($text_search_container) {
      $text_search_container.innerHTML = template.render('partials/products_text_search');
    }
    return null;
  }
}

