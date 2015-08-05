/**
 * Products search by categories
 * 
 */
define([
  'views/base',
  'views/products',
  'views/navs/categories',
  'views/product/category_header',
  'views/product/category_more_info',
  'views/content_panel',
  './search_stats',
  'template',
  'lib/events'
], function(
  BaseView,
  ProductsView,
  CategoriesNavView,
  ProductCategoryHeaderView,
  ProductCategoryMoreInfoView,
  ContentPanelView,
  ProductsSearchStatsView,
  template,
  global_events
) {
  return BaseView.extend({ 
    
    events: {
    },
    
    initialize: function(opts) {
      this.products = opts.products;
      this.products_view = new ProductsView({
        collection:         this.products
      });
      this.nav_view = new CategoriesNavView({ products: this.products });
      this.product_category_header_view = new ProductCategoryHeaderView({
        products: this.products
      });
      this.stats_view = new ProductsSearchStatsView({
        products: this.products
      });
      this.listenTo(this.products.refs.selected_categories, 'add',
        this.toggleMoreInfoLink);
    },
    
    render: function() {
      this.$el.html(template.render('partials/products_search', {
        products: [],
        paginate: null,
        heading:  null
      }));
      this.$el.addClass('products-categories-search');
      this.products_view.setElement(this.$el.find('.products'));
      this.$el.find('.categories').html(this.nav_view.render().el);
      this.product_category_header_view.setElement(this.$el.find('h1'));
      this.stats_view.setElement(this.$el.find('.stats'));
      //this.delegateEvents(this.events);
      this.$el.find('.more-info').on('click', _.bind(this.showCategoryMoreInfo, this));
      return this;
    },
    
    toggleMoreInfoLink: function() {
      var selected_category = this.products.refs.selected_categories.at(0),
          $more_info        = this.$el.find('.more-info-container');
      if (selected_category && selected_category.get('more_info_content_block')) {
        $more_info.removeClass('hide');
        $more_info.find('a').text(selected_category.get('more_info_title'));
      } else {
        $more_info.addClass('hide');
      }
    },
    
    showCategoryMoreInfo: function(ev) {
      var more_info_view = new ProductCategoryMoreInfoView({
        products: this.products
      });
      global_events.trigger('content-panel:show', more_info_view.render().$el);
      global_events.on('content-panel:hidden', _.bind(more_info_view.close,
        more_info_view));
    },

    onClose: function() {
      this.products.trigger('kill');
      this.products.unbind();
      this.products.unbindRefs();
      this.products.refs.filtered_products.reset();
      this.stats_view.close();
      this.nav_view.close();
      this.products_view.close();
    }

  });
});

