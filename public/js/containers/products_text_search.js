
import template from 'lib/template';
import events from 'events/app';
import ProductsTextSearchListComponent from 'components/products_text_search_list';
//import 'element-closest';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$products_list = null;
  }

  connected($el) {
    this.$input = $el.querySelector('#search1');
    this.$products_list = $el.querySelector('.products-text-search .products-list');
    this.$input.addEventListener('keyup', this.keyup.bind(this));
    //this.$input.addEventListener('blur', this.blur.bind(this));
    //window.addEventListener('click', this.click.bind(this));
    events.registerDomEvent('click', 'products-text-search:navigate', ev => {
      //history.pushState({ previous: location.pathname }, null, ev.target.href);// move this
      events.emit('app:navigate', ev.target.getAttribute('href'));
      this.$input.focus();
    });
    // this plugin needs context to determine what action
    events.on('app:navigate', path => {
      if (location.pathname.match(/\/instruments\/[^\/]+\/\d+/i) === null) {
        console.log('nio');
        this.close();    
      }
    });
  }
  
  close() {
    this.$input.value = '';
    this.$products_list.innerHTML = '';
  }

  click(ev) {
    ev.preventDefault();
    //if (ev.target.dataset.action == 'app:navigate' && ev.target.closest('.site-header')) {
    //console.log(ev.path);
      //this.$input.focus();
      //this.$input.removeEventListener('blur', this.blur.bind(this));
      //clearTimeout(this.timeout_id);
    /*} else {
      this.$input.value = '';
      this.$products_list.innerHTML = '';
    }*/
  }

  keyup(ev) {
    const products = this.store.products.getSearchResults(ev.target.value, 150); // limit?
    if (!products.length) {
      this.$products_list.innerHTML = '';
      return null;
    }
    this.store.filtered_products.reset(products);
    const products_text_search_list_component = new ProductsTextSearchListComponent(
      { ...this.context, params: { products }},
      this.store
    );
    this.$products_list.innerHTML = '';
    this.$products_list.appendChild(products_text_search_list_component.render());
  }

  blur(ev) {
    // Timeout so that dropdown doesn't disappear 
    this.timeout_id = setTimeout(() => {
      this.$input.value = '';
      this.$products_list.innerHTML = '';
    }, 300);
  }

  render() {
    this.store.products.createProductsIndex();
    const $text_search_container = document.body.querySelector('.text-search');
    if ($text_search_container) {
      $text_search_container.innerHTML = template.render('partials/products_text_search');
    }
    return null;
  }
}

