
export default class {
  
  constructor(params) {
    this.$el = document.createElement('template');
    this.params = params;
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search.jade')();
    return this.$el.content;
  }
}

