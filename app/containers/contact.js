
import template from 'lib/template';
import ContactComponent from 'components/contact';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    const contact_component = new ContactComponent;
    this.$el.content.appendChild(contact_component.render());
    return this.$el.content;
  }
}


