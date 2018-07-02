
import template from 'lib/template';
import events from 'events/app';
import ProductsTextSearchItemComponent from 'components/products_text_search_item';

export default class {
  
  constructor(params, store, $el) {
    this.store = store;

    this.collection = params.collection;

    this.$el = $el;
    console.log(this.$el);
    events.on('connected', this.connected.bind(this));
  }

  connected() {

    // Hijack app:navigate click to focus the input
    this.$el.addEventListener('click', ev => { // scope?
      ev.stopPropagation();
      ev.preventDefault();
      // In case we are about to blur...cancel that
      clearTimeout(this.blur_timeout_id);
      if (ev.target.tagName == 'A') {
        //this.$input.focus(); ////////////////
        this.highlightFromPathname(ev.target.getAttribute('href'));///???????????
        events.emit('app:navigate', ev.target.getAttribute('href'));
        //events.emit('products-text-search:selected', this.selected_index);
      }
    });

    /*events.on('app:product-selected', path => {
      if (path != location.pathname) {
        //console.log(path, location.pathname, this.keydown);
        this.highlightFromPathname(path);
        events.emit('app:navigate', path); 
      }
    });*/

    // Close dropdown and don't bother trying to duplicate history while
    // navigating through dropdown list
    window.addEventListener('popstate', (ev) => {
      this.close();
      this.collection.reset();
    });
  }

  // use history.back() and forward() to prevent browser throttling pushState calls
  onKeydown(ev) { // move to 'Input nav list'?
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

  getResults() {
    throw new Error('Please define getResults() method');  
  }

  onKeyup(ev) {
    const results = this.getResults(ev.target.value);

    //if (this.cached_search_value == ev.target.value) {
    //  return null;
    //}

    //if (this.last_search != ev.target.value) {
    this.selected_index = null;
    //}

    //this.cached_search_value = ev.target.value;
    events.emit('nav-list:update');
    //this.update();
  }

  render($el) {
    const $ul = document.createElement('ul');
    this.$el.innerHTML = '';
    this.$el.appendChild($ul);
    const products = this.collection.models.map(product => { // change to "nav item" etc.
      const products_text_search_item_component = new ProductsTextSearchItemComponent({
        ...this.context,
        params: {
          product
        }
      });
      $ul.appendChild(products_text_search_item_component.render());
    });
    return this.$el;
  }

  close() {
    this.$el.innerHTML = '';
    // off handlers
  }

  /*setSelectedIndex(operand) {
    if (!this.selected_index) {
      this.selected_index = 1;
    } else {
      const next = this.selected_index + operand;
      if (next > 0 && next <= this.collection.models.length) {
        this.selected_index = next;
      }
    }
    return true;
  }

  highlightFromPathname(path) {
    this.clearSelected();
    Array.from(this.$list.querySelectorAll('li')).forEach(($li, i) => {
      if ($li.dataset.pathname == path) {
        this.selected_index = i + 1; ///// !!!!!!!!!1
        $li.className = 'selected';
      }
    });
  }

  highlightFromIndex(i) {
    const target = this.$list.querySelector(`li:nth-of-type(${i})`);
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
    const $current = this.$list.querySelector('li.selected');
    if ($current) {
      $current.className = '';
    }
  }


  }*/
}

