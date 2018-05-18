/**
 * Text search products list view
 * 
 */
import BaseView from 'views/base';
import TextSearchProductView from 'views/products/text_search/product';

export default BaseView.extend({

  tagName: 'ul',

  events: {
  },

  initialize: function(opts) {
    this.refs = this.collection.refs;
    this.listenTo(this.collection, 'change reset', () => {
      this.render();
    });
  },

  render: function() {
    this.$el.attr('.products');
    this.$el.empty();
    this.collection.forEach(model => {
      var view = new TextSearchProductView({
        model,
        products: this.collection,
        refs: this.refs
      });
      this.$el.append(view.render().el);
      this.listenTo(view, 'selected', () => this.trigger('selected'));
    });
    return this;
  }
});
