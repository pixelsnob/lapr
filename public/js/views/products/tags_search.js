/**
 * Products search by tags
 * 
 */
define([
  'views/base',
  'views/products',
  'views/navs/tags',
  './search_stats',
  'template'
], function(
  BaseView,
  ProductsView,
  TagsNavView,
  ProductsSearchStatsView,
  template
) {
  return BaseView.extend({ 
    
    events: {
    },

    initialize: function(opts) {
      this.products = opts.products;
      this.tags_nav_view = new TagsNavView({
        products: this.products
      });
      this.products_view = new ProductsView({
        collection:         this.products
      });
      this.stats_view = new ProductsSearchStatsView({
        products: this.products
      });
    },

    render: function() {
      this.$el.html(template.render('partials/products_search', {
        products: [], paginate: null, heading: 'Sound Search'
      }));
      this.$el.addClass('products-tags-search');
      this.products_view.setElement(this.$el.find('.products'));
      this.$el.find('.tags-tree').html(this.tags_nav_view.render().el);
      this.stats_view.setElement(this.$el.find('.stats'));
      return this;
    },

    onClose: function() {
      this.products.trigger('kill');
      this.products.unbind();
      this.products.unbindRefs();
      this.products.refs.filtered_products.reset();
      this.tags_nav_view.close();
      this.stats_view.close();
      this.products_view.close();
    }

  });
});
