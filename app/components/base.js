
import uniqid from 'uniqid';

export default class {
  
  constructor(params, slots = {}) {
    this.$el = document.createElement('template');
    this.params = params;
    this.slots = slots;
    this.id = uniqid();
    this.selector = '#' + this.id;
  }

  render() {
    return this.$el.content.cloneNode(true);
  }
}

