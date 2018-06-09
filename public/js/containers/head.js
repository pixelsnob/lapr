
import template from 'lib/template';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }
  
  setParams() {
    
  }

  render() {
    this.$el.innerHTML = template.render('partials/head', {
      title: '',
      description: '',
      assets_version: '',
      csrf_param: '',
      env: '',
      base_url: '',
      original_url: '',
      og_image: '',
      user: {}
    });
    return this.$el.content.cloneNode(true);
  }
}

