
import template from 'lib/template';
import events from 'events/app';


export default class {
  
  constructor(params, store) {
    this.store = store;
    this.collection = params.collection;
    this.$el = params.$el;

    events.once('connected', this.connected.bind(this));
  }

  connected() {
    this.store.products.createProductsIndex();

    this.$input = this.$el.querySelector('#search1');

    this.$input.addEventListener('keyup', events.emit.bind(events, 'search-input:keyup'));
    this.$input.addEventListener('keydown', events.emit.bind(events, 'search-input:keydown'));
    this.$input.addEventListener('blur', this.onBlur.bind(this));
    
    events.on('nav-list:selected', (pathname) => {
      clearTimeout(this.blur_timeout_id);
      this.$input.focus();
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/search_input.jade')({
      input_id: 'search1'
    });
    return this.$el;
  }

  onBlur(ev) {
    // Timeout so that clicking on the dropdown doesn't trigger it to be closed on blur
    this.blur_timeout_id = setTimeout(() => {
      this.$input.value = '';
      events.emit('search-input:blur');
    }, 300);
  }

}

