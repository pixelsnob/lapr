
import markdown from 'lib/markdown';

export default class {

  constructor(params) {
    this.params = params;
    this.$el = document.createElement('template');
  }

  render() {
    if (this.params.content_block && this.params.content_block.type == 'markdown') {
      this.$el.innerHTML = require('views/partials/content_block.jade')({
        content: markdown(this.params.content_block.content)
      });
    }
    return this.$el.content.cloneNode(true);
  }
}

