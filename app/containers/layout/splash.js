
import SplashLayoutComponent from 'components/layout/splash';
import HeaderComponent from 'components/layout/header';
import FooterComponent from 'components/layout/footer';
import SiteSearchContainer from 'containers/site_search';

export default class {
  
  constructor(params, store, slots = {}) {
    this.params = params;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');
  }

  render() {
    const site_search_container = new SiteSearchContainer(this.params, this.store);
    const header_component = new HeaderComponent(this.params, {
      $search: site_search_container.render()
    });
    const footer_component = new FooterComponent;
    const splash_layout_component = new SplashLayoutComponent(this.params, {
      $header: header_component.render(),
      $footer: footer_component.render(),
      $content: this.slots.$content || ''
    });
    this.$el.content.appendChild(splash_layout_component.render());
    return this.$el.content;
  }
}


