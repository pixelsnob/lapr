
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

    this.$input.addEventListener('keyup', this.onKeyup.bind(this));
    this.$input.addEventListener('keydown', this.onKeydown.bind(this));

    events.registerDomEvent('click', 'products-text-search:navigate', ev => {
      this.clearSelected();
      events.emit('app:navigate', ev.target.getAttribute('href'));
      this.$input.focus();
      ev.target.parentNode.parentNode.className = 'selected';
      // determine index
    });

    // Close if user navigates to another page besides a product page
    events.on('app:navigate', path => {
      // hacky...
      if (location.pathname.match(/\/instruments\/[^\/]+\/\d+/i) === null) {
        this.close();    
      }
      console.log(history.state);
      // to highlight instead use a custom param in pushstate
    });
  }
  
  onKeydown(ev) {
    switch (ev.keyCode) {
      case 38:
        this.setSelectedIndex(-1);
        this.highlightSelected('down');
        break;
      case 40:
        this.setSelectedIndex(1);
        this.highlightSelected('up');
        break;
    }
    ev.stopPropagation();
  }

  setSelectedIndex(operand) {
    if (!this.selected_index) {
      this.selected_index = 1;
    } else {
      const next = this.selected_index + operand;
      if (next > 0 && next <= this.store.filtered_products.models.length) {
        this.selected_index = next;
      }
    }
    return true;
  }

  highlightSelected(direction) {
    const target = this.$products_list.querySelector(`li:nth-of-type(${this.selected_index})`);
    if (target) {
      this.clearSelected();
      target.className = 'selected';
      const $target_a = target.querySelector('a');
      if ($target_a && location.pathname.indexOf($target_a.getAttribute('href')) == -1) {
        events.emit('app:navigate', $target_a.getAttribute('href'));
        //location.pushState({ source: 'products-text-search' });
      }
    }
  }
  
  clearSelected() {
    const $current = this.$products_list.querySelector('li.selected');
    if ($current) {
      $current.className = '';
    }
  }

  onKeyup(ev) {
    const products = this.store.products.getSearchResults(ev.target.value, 50)
    if (this.cached_search_value == ev.target.value) {
      return null;
    }
    this.selected_index = null;
    this.cached_search_value = ev.target.value;
    if (!products.length) {
      this.$products_list.innerHTML = '&nbsp;';//<
      return null;
    }
    const products_text_search_list_component = new ProductsTextSearchListComponent(
      { ...this.context, params: { products: this.store.filtered_products.models }},
      this.store
    );
    this.$products_list.innerHTML = '';
    this.$products_list.appendChild(products_text_search_list_component.render());
  }

  onBlur(ev) {
    if (location.pathname.match(/\/instruments\/[^\/]+\/\d+/i) === null) {
      return;
    }
    // Timeout so that dropdown doesn't disappear 
    this.timeout_id = setTimeout(() => {
      this.$input.value = '';
      this.$products_list.innerHTML = '';
    }, 300);
  }

  close() {
    this.selected_index = null;
    this.$input.value = '';
    this.$products_list.innerHTML = '';
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

