/**
 * Products search by categories
 * 
 */
import BaseView from 'views/base';
import ProductsView from 'views/products';
import CategoriesNavView from 'views/navs/categories';
import ProductCategoryHeaderView from 'views/product/category_header';
import ProductCategoryMoreInfoView from 'views/product/category_more_info';
import ProductsSearchStatsView from './search_stats';
import template from 'template';
import global_events from 'lib/events';

export default BaseView.extend({

  events: {},

  initialize: function(opts) {
    this.products = opts.products;
    this.products_view = new ProductsView({
      collection: this.products
    });
    this.nav_view = new CategoriesNavView({
      products: this.products
    });
    this.product_category_header_view = new ProductCategoryHeaderView({
      products: this.products
    });
    this.stats_view = new ProductsSearchStatsView({
      products: this.products
    });
    var refs = this.products.refs,
      obj = this;
    // If a product is added to the collection, and the product is in the current category,
    // or no category is selected (all products shown), add it to the filtered list
    this.listenTo(this.products, 'add', function(model) {
      var selected_category = this.getSelectedCategory(),
        categories = model.get('categories');
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
      global_events.trigger('set-page-title', this.getTitleTag());
    });
  },

  render: function() {
    this.$el.html(template.render('partials/products_search', {
      class_name: 'products-categories-search',
      products: [],
      paginate: null,
      heading: null
    }));
    this.products_view.setElement(this.$el.find('.products'));
    this.$el.find('.categories').html(this.nav_view.render().el);
    this.product_category_header_view.setElement(this.$el.find('h2'));
    this.stats_view.setElement(this.$el.find('.stats'));
    this.$el.find('.more-info').on('click',
      _.bind(this.showCategoryMoreInfo, this));
    return this;
  },

  toggleMoreInfoLink: function() {
    var selected_category = this.getSelectedCategory(),
      $more_info = this.$el.find('.more-info-container');
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
    global_events.trigger('show-content-panel', more_info_view);
  },

  getSelectedCategory: function() {
    return this.products.refs.selected_categories.at(0);
  },

  getTitleTag: function() {
    var selected_category = this.getSelectedCategory();
    return (selected_category ? selected_category.get('name') :
      'All Instruments');
  },

  onClose: function() {
    this.products.trigger('kill');
    this.products.refs.filtered_products.reset();
    this.stats_view.close();
    this.nav_view.close();
    this.products_view.close();
  }

});

