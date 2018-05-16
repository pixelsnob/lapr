/**
 * Categories navigation view
 * 
 */
import BaseView from 'views/base';
import CategoriesNavItemView from './categories_item';

export default BaseView.extend({

  tagName: 'ul',

  events: {},

  initialize: function(opts) {
    this.products = opts.products;
    this.listenTo(this.products.refs.product_categories, 'add change remove', this.render);
  },

  // move to collection
  setSelectedCategory: function(category) {
    this.products.refs.selected_categories.reset();
    if (!category) {
      return;
    }
    var model = this.products.refs.product_categories.findWhere({
      slug: category
    });
    if (model) {
      this.products.refs.selected_categories.add(model);
    }
  },

  render: function() {
    this.$el.empty();
    this.products.refs.product_categories.forEach(category => {
      var view = new CategoriesNavItemView({
        model: category,
        products: this.products
      });
      this.$el.append(view.render().el);
    });
    return this;
  }
});
