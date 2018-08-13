
export default class {
  
  constructor(params, $el) {
    this.$el = $el || document.createElement('template');
    this.params = params;
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search.jade')();
    return this.$el.content;
  }
}

