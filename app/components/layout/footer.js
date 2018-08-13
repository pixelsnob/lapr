
export default class {
  
  constructor(params, $el) {
    this.params = params;
    this.$el = $el || document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/layout/footer.jade')();
    return this.$el.content;
  }
}

