
export default class {
  
  constructor(params, $el) {
    this.params = params;
    this.$el = $el || document.createElement('template');
  }

  connected($el) {
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search_list.jade')({
      results: this.params.results
    });
    return this.$el.content;
  }
}


