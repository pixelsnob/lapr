
import SplashLayoutContainer from 'containers/layout/splash';
import IndexContainer from 'containers/index';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    const index_container = new IndexContainer(this.params, this.store);
    const splash_layout_container = new SplashLayoutContainer(this.params, this.store);
    this.$el.content.appendChild(splash_layout_container.render());
    this.$el.content.querySelector('.content-main').appendChild(index_container.render());
    return this.$el.content;
  }
}


