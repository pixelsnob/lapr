
import template from 'lib/template';
import events from 'events/app';
import ProductsTextSearchListComponent from 'components/products_text_search_list';

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
    this.$input.addEventListener('blur', this.onBlur.bind(this));

    // Hijack app:navigate click to focus the input
    this.$products_list.addEventListener('click', ev => { // scope?
      ev.stopPropagation();
      ev.preventDefault();
      // In case we are about to blur...cancel that
      clearTimeout(this.blur_timeout_id);
      if (ev.target.tagName == 'A') {
        this.$input.focus();
        this.highlightFromPathname(ev.target.getAttribute('href'));///???????????
        events.emit('app:navigate', ev.target.getAttribute('href'));
        events.emit('products-text-search:selected', this.selected_index);
      }
    });

    events.on('app:product-selected', path => {
      if (path != location.pathname) {
        console.log(path, location.pathname, this.keydown);
        this.highlightFromPathname(path);
        events.emit('app:navigate', path); 
      }
    });

    // Close dropdown and don't bother trying to duplicate history while
    // navigating through dropdown list
    window.addEventListener('popstate', (ev) => {
      this.close();
      this.store.filtered_products.reset();
    });
  }
  
  // use history.back() and forward() to prevent browser throttling pushState calls
  onKeydown(ev) {
    this.keydown = true;
    const highlightAndNavigate = () => {
      const path = this.highlightFromIndex(this.selected_index);
      if (path) {
        events.emit('app:navigate', path);
        events.emit('products-text-search:selected', this.selected_index);
      }
    };

    switch (ev.keyCode) {
      case 38:
        this.setSelectedIndex(-1);
        highlightAndNavigate(); 
        break;
      case 40:
        this.setSelectedIndex(1);
        highlightAndNavigate(); 
        break;
    }
    ev.stopPropagation();
    this.keydown = false;
  }

  onKeyup(ev) {
    const products = this.store.products.getSearchResults(ev.target.value, 20)
    if (this.cached_search_value == ev.target.value) {
      return null;
    }

    //if (this.last_search != ev.target.value) {
      this.selected_index = null;
    //}

    this.cached_search_value = ev.target.value;

    if (!products.length) {
      this.$products_list.innerHTML = '';
      return null;
    }
    const products_text_search_list_component = new ProductsTextSearchListComponent({
      ...this.context,
      params: {
        products: this.store.filtered_products.models,
        selected_index: this.selected_index
      }
    }, this.store);
    this.$products_list.innerHTML = '';
    this.$products_list.appendChild(products_text_search_list_component.render());
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

  highlightFromPathname(path) {
    this.clearSelected();
    Array.from(this.$products_list.querySelectorAll('li')).forEach(($li, i) => {
      if ($li.dataset.pathname == path) {
        this.selected_index = i + 1; ///// !!!!!!!!!1
        $li.className = 'selected';
      }
    });
  }

  highlightFromIndex(i) {
    const target = this.$products_list.querySelector(`li:nth-of-type(${i})`);
    if (target) {
      this.clearSelected();
      target.className = 'selected';
      const $target_a = target.querySelector('a');
      if ($target_a && location.pathname.indexOf($target_a.getAttribute('href')) == -1) {
        return $target_a.getAttribute('href');
      }
    }
    return null;
  }
  
  clearSelected() {
    const $current = this.$products_list.querySelector('li.selected');
    if ($current) {
      $current.className = '';
    }
  }

  onBlur(ev) {
    // Timeout so that clicking on the dropdown doesn't trigger it to be closed on blur
    this.blur_timeout_id = setTimeout(() => {
      this.close();
    }, 300);
  }

  close() {
    this.$input.value = '';
    this.$products_list.innerHTML = '';
  }

  render() {
    this.store.products.createProductsIndex();
    const $text_search_container = document.body.querySelector('.text-search');
    if ($text_search_container) {
      $text_search_container.innerHTML = require('views/partials/products_text_search.jade')();
    }
    return null;
  }
}

