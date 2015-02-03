/**
 * Products search by tags
 * 
 */
define([
  'views/base',
  'views/products',
  'views/tags_tree',
  'template'
], function(
  BaseView,
  ProductsView,
  TagsTreeView,
  template
) {
  return BaseView.extend({ 
    
    events: {
    },

    initialize: function(opts) {
      this.products = opts.products;
      this.tags_tree_view = new TagsTreeView({
        products: this.products
      });
      this.products_view = new ProductsView({
        collection:         this.products
      });
    },

    render: function() {
      this.$el.html(template.render('partials/products_search', {
        products: [], paginate: null, heading: 'Sound Search'
      }));
      this.$el.addClass('products-tags-search');
      this.products_view.setElement(this.$el.find('.products'));
      this.$el.find('.tags-tree').html(this.tags_tree_view.render().el);
      return this;
    },

    onClose: function() {
      this.products.trigger('kill');
      this.products.unbind();
      this.products.unbindRefs();
      this.products.refs.filtered_products.reset();
      this.tags_tree_view.close();
      this.products_view.close();
    }

  });
});

