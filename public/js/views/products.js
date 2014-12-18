/**
 * Products list view
 * 
 */
define([
  'views/base',
  'views/product'
], function(
  BaseView,
  ProductView
) {
  
  return BaseView.extend({

    events: {
    },

    initialize: function(opts) {
      this.collection = opts.collection;
      this.refs = opts.refs;
      this.setElement(opts.el);
    },
    
    render: function() {
      var fragment = document.createDocumentFragment(),
          obj      = this;
      this.collection.forEach(function(product) {
        var view = new ProductView({
          model:              product,
          refs:               obj.refs
        });
        fragment.appendChild(view.render().el);
      });
      this.$el.find('tbody').html(fragment);
      return this;
    },
    
    showByCategory: function(slug) {
      var obj = this;
      var products = this.collection.filter(function(product) { 
        return _.some(product.get('categories'), function(id) {
          var category = obj.refs.product_categories.findWhere({ _id: id });
          if (!category) {
            return;
          }
          return category.get('slug') == slug;
        });
      });
      this.render(products);// <<<<<<<<<<<<
      return false;
    }

  });
  
});
