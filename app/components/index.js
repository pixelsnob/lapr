
if (!window.customElements.get('x-test')) {
  window.customElements.define('x-test', class extends HTMLElement {
    constructor() {
      super();
      const $el = this.attachShadow({ mode: 'open' });
      $el.innerHTML = '<p>test</p>';
    }
    connectedCallback() {
      console.log('connected');
    }
  });
}
