/**
 * Categories navigation view
 * 
 */
define([
  'views/base',
  'views/categories_nav_item'
], function(
  BaseView,
  CategoriesNavItemView
) {
  
  return BaseView.extend({
    
    tagName: 'ul',

    events: {
    },

    initialize: function(opts) {
      this.products = opts.products;
      //this.listenTo(this.products.refs.tags, 'add change remove', this.render);// ? 
    },
    
    setSelectedCategory: function(category_id) {
    },

    render: function() {
      var obj = this;
      this.$el.empty();
      this.products.refs.product_categories.forEach(function(category) {
        //var category = obj.products.refs.tags.where({ category: category.id });
        var view = new CategoriesNavItemView({
          model: category,
          products: obj.products
        });
        obj.$el.append(view.render().el);
      });
      return this;
    }
  });
  
});
