
import SplashLayoutContainer from 'containers/layout/splash';
import ContactContainer from 'containers/contact';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    debugger;
    const contact_container = new ContactContainer(this.params, this.store);
    const splash_layout_container = new SplashLayoutContainer(this.params, this.store, {
      $content: contact_container.render()
    });
    return this.$el.content;
  }
}


