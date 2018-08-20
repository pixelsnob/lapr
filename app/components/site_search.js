
import uniqid from 'uniqid';
import diffhtml from 'diffhtml';

export default class {
  
  constructor(params, slots = {}) {
    this.$el = document.createElement('template');
    this.params = params;
    this.id = uniqid();
    this.selector = '#' + this.id;
    this.results_selector = `${this.selector} [class$="__results"]`;
    this.form_selector = `${this.selector} [class$="__form"]`;
  }
  
  setInput($input) {
    this.$input = $input;
  }

  getResultsContainer() {
    return document.querySelector(this.results_selector);
  }

  setResults($results) {
    this.clearResults();
    diffhtml.innerHTML(this.getResultsContainer(), $results);
  }
  
  clearResults() {
    this.getResultsContainer().innerHTML = '';
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search.jade')({
      id: this.id,
    });
    if (this.$input) {
      this.$el.content.querySelector(this.form_selector).appendChild(this.$input);
    }
    return this.$el.content.cloneNode(true);
  }
}

