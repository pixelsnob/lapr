
import template from 'lib/template';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    document.body.className = 'index';//<<
    this.$el.innerHTML = require('views/partials/index.jade')();
    return this.$el.content;
  }
}
