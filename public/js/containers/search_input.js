
import template from 'lib/template';
import events from 'events/app';

import NavListContainer from 'containers/nav_list';

export default class {
  
  constructor(params, store, $el) {
    this.store = store;
    this.collection = params.collection;

    this.$el = $el;

    events.on('connected', this.connected.bind(this));
  }

  connected() {
    //console.log('connected');
    this.store.products.createProductsIndex();
    this.$input = this.$el.querySelector('#search1');

    this.$input.addEventListener('keyup', this.onKeyup.bind(this));
    this.$input.addEventListener('keydown', ev => this.onKeydown(ev));
    this.$input.addEventListener('blur', this.onBlur.bind(this));

    events.on('nav-list:update', this.render.bind(this))
  }

  onKeyup(ev) {
    this.store.products.getSearchResults(ev.target.value);
    this.nav_list_container.render();
  }

  onKeydown(ev) {
    // highlight list!
    //this.nav_list_container.onKeydown(ev); 
  }

  render() {
    this.$el.innerHTML = require('views/partials/search_input.jade')({
      input_id: 'search1'
    });
    this.nav_list_container = new NavListContainer({
      collection: this.collection
    }, this.store, this.$el.querySelector('.search-results'));

    this.nav_list_container.render();
    return this.$el;
  }

  onBlur(ev) {
    // Timeout so that clicking on the dropdown doesn't trigger it to be closed on blur
    this.blur_timeout_id = setTimeout(() => {
      this.$input.value = '';
      this.nav_list_container.close();
    }, 300);
  }

}

