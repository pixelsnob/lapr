
import template from 'lib/template';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    document.body.className = 'index';//<<
    this.$el.innerHTML = require('views/partials/index.jade')();
    return this.$el.content;
  }
}
