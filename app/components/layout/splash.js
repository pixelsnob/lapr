
export default class {
  
  constructor(params, slots = {}) {
    this.slots = slots;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/layout/splash.jade')();
    if (this.slots.$header) {
      this.$el.content.querySelector('.header').appendChild(this.slots.$header);
    }
    if (this.slots.$footer) {
      this.$el.content.querySelector('.footer').appendChild(this.slots.$footer);
    }
    if (this.slots.$content) {
      this.$el.content.querySelector('.content-main').appendChild(this.slots.$content);
    }
    return this.$el.content.cloneNode(true);
  }
}

