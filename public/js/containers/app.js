
import template from 'lib/template';
import HeadContainer from 'containers/head';

export default class {
  
  constructor(context, store, slots = {}) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');

    this.head_container = new HeadContainer;

    if (!document.head.populated) {
      // modify <head> directly
      document.head.appendChild(this.head_container.render().cloneNode(true));
      document.head.populated = true;
    }

  }

  render() {
    this.head_container.setParams();
    this.$el.innerHTML = template.render('partials/body');//>
    if (this.slots.main) {
      this.$el.content.querySelector('#main').appendChild(this.slots.main.render());
    }
    return this.$el.content.cloneNode(true);
  }
}

