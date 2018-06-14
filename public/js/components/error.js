
export default class {
  
  constructor(err) {
    this.error = err;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = `<h2>%$#@^%$#!!!!<br>${this.error.message}</h2>`;
    return this.$el.content.cloneNode(true);
  }
}

