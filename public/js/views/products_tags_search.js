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

    filter: function(tags) {
      this.tags_tree_view.setSelectedTags(tags);
      this.products_view.filterProductsByTags();
      return false;
    },
    
    render: function() {
      this.$el.html(template.render('products_tags_search', {
        products: [], paginate: null, heading: ''
      }));
      this.$el.addClass('products-tags-search');
      this.products_view.setElement(this.$el.find('.products'));
      var $tt = this.$el.find('.tags-tree');
      if (!$tt.children().length) {
        $tt.html(this.tags_tree_view.render().el);
      }
      return this;
    }

  });
});

