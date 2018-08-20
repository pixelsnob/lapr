
export default class {
  
  constructor(params) {
    this.params = params;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/layout/footer.jade')();
    return this.$el.content.cloneNode(true);
  }
}

