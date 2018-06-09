
import template from 'lib/template';

export default class {
  
  constructor(context, store, slots = {}) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');
  }

  render() {
    //this.$el.innerHTML = template.render('partials/body');
    this.$el.innerHTML = '<body>d</body>';
    return this.$el.content.cloneNode(true);
  }
}

