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
      var refs = this.products.refs,
          obj  = this;
      // If a product is added to the collection, and the product is in the current category,
      // or no category is selected (all products shown), add it to the filtered list
      this.listenTo(this.products, 'add', function(model) {
        var selected_category = refs.selected_categories.at(0),
            categories        = model.get('categories');
        if (!selected_category || _.contains(categories, selected_category.id)) {
          refs.filtered_products.add(model);
          model.highlight = true;
          obj.products_view.render();
        }
      });
      this.listenTo(refs.selected_categories, 'add reset', function() {
        this.$el.find('.boxes-list').scrollTop(0);
        $(window).scrollTop(0);
        obj.toggleMoreInfoLink();
      });
    },
    
    render: function() {
      this.$el.html(template.render('partials/products_search', {
        class_name: 'products-categories-search',
        products:   [],
        paginate:   null,
        heading:    null
      }));
      this.products_view.setElement(this.$el.find('.products'));
      this.$el.find('.categories').html(this.nav_view.render().el);
      this.product_category_header_view.setElement(this.$el.find('h2'));
      this.stats_view.setElement(this.$el.find('.stats'));
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
      this.content_panel_view = new ContentPanelView;
      this.content_panel_view.render(more_info_view.render().el).show();
    },

    onClose: function() {
      this.products.trigger('kill');
      this.products.unbind();
      this.products.unbindRefs();
      this.products.refs.filtered_products.reset();
      this.stats_view.close();
      this.nav_view.close();
      this.products_view.close();
      if (this.content_panel_view) {
        this.content_panel_view.close();
      }
    }

  });
});

