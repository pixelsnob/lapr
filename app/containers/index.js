
import template from 'lib/template';
import index_component from 'components/index';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    document.body.className = 'index';
    this.$el.innerHTML = require('views/partials/index.jade')();
    return this.$el.content;
  }
}
