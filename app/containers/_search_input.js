
import template from 'lib/template';
import events from 'events/app';


export default class extends EventEmitter {
  
  constructor(params, store) {
    this.store = store;
    this.collection = params.collection;
    this.$el = params.$el;

    events.once('connected', this.connected.bind(this));
  }

  connected() {
    this.store.products.createProductsIndex();

    this.$input = this.$el.querySelector('#search1');

    this.$input.addEventListener('keyup', this.emit.bind(events, 'keyup'));
    this.$input.addEventListener('keydown', this.emit.bind(events, 'keydown'));
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
      this.emit('blur');
    }, 300);
  }

}

