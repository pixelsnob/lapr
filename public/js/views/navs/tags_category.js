/**
 * Tags tree category view
 * 
 */
import BaseView from 'views/base';
import TagsListView from './tags_list';

export default BaseView.extend({

  tagName: 'li',

  events: {},

  initialize: function(opts) {
    this.products = opts.products;
    this.tags = opts.tags;
  },

  render: function() {
    this.$el.append(this.model.get('name'));
    var view = new TagsListView({
      collection: this.tags,
      products: this.products
    });
    this.$el.append(view.render().el);
    return this;
  }

});
