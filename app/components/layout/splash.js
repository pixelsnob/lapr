
export default class {
  
  constructor(params, slots, $el) {
    this.slots = slots;
    this.$el = $el || document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/layout/splash.jade')();
    if (this.slots.$header) {
      this.$el.content.querySelector('.header').appendChild(this.slots.$header);
    }
    if (this.slots.$footer) {
      this.$el.content.querySelector('.footer').appendChild(this.slots.$footer);
    }
    return this.$el.content;
  }
}

