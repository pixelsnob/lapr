
import SplashLayoutComponent from 'components/layout/splash';
import HeaderComponent from 'components/layout/header';
import FooterComponent from 'components/layout/footer';
import SiteSearchContainer from 'containers/site_search';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    const footer_component = new FooterComponent;
    const site_search_container = new SiteSearchContainer(this.params, this.store);
    const header_component = new HeaderComponent(this.params, {
      $search: site_search_container.render()
    });
    const splash_layout_component = new SplashLayoutComponent(this.params, {
      $header: header_component.render(),
      $footer: footer_component.render()
    });
    this.$el.content.appendChild(splash_layout_component.render());
    return this.$el.content;
  }
}


