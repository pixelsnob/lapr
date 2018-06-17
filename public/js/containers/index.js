
import template from 'lib/template';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    document.body.className = 'index';//<<
    this.$el.innerHTML = template.render('partials/index');
    return this.$el.content;
  }
}
