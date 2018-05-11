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
    var obj = this;
    this.$el.empty();
    this.products.refs.product_categories.forEach(function(category) {
      var view = new CategoriesNavItemView({
        model: category,
        products: obj.products
      });
      obj.$el.append(view.render().el);
    });
    return this;
  }
});
