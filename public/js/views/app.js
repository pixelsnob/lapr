/**
 * Top-level app view
 * 
 */
import BaseView from 'views/base';
import ProductsView from 'views/products';
import ProductsSearchView from 'views/products/categories_search';
import ProductsTagsSearchView from 'views/products/tags_search';
import ProductsTextSearchResultsView from 'views/products/text_search_results';
import ProductsTextSearchView from 'views/products/text_search';
import ProductDetailsView from 'views/product/details';
import ListNavLinksView from 'views/list_nav_links';
import ProductCategoriesNavView from 'views/navs/categories';
import ContactView from 'views/contact';
import IndexView from 'views/index';
import ContentPanelView from 'views/content_panel';
import MobileMenuView from 'views/mobile_menu';
import PagesCollection from 'collections/pages';
import global_events from 'lib/events';

export default BaseView.extend({

  el: 'body',

  events: {
    'click a.navigate': 'navigate',
    'mouseenter .dropdown': 'showNavDropdown',
    'mouseleave .dropdown': 'hideNavDropdown',
    'click .dropdown': 'hideNavDropdown',
    'click #show-mobile-menu': 'showMobileMenu'
  },

  current_view: null,

  initialize: function(opts) {
    this.products = opts.products;
    this.$main = this.$el.find('#main');
    this.listenTo(global_events, 'categories-nav-select', this.hideSiteMenu);
    this.listenTo(global_events, 'set-page-title', this.setPageTitle);
    this.listenTo(global_events, 'show-content-panel', this.showContentPanel);
  },

  render: function() {
    var text_search_view = new ProductsTextSearchView({
      products: this.products,
      input_id: 'text-search'
    });
    var product_categories_nav_view = new ProductCategoriesNavView({
      products: this.products
    });
    this.$el.find('header .text-search').empty().append(text_search_view.render().el);
    this.mobile_menu_view = new MobileMenuView({
      products: this.products
    });
    this.mobile_menu_view.render();
    // merge this with sidebar list navs, etc.
    var $product_categories_dropdown = product_categories_nav_view.render().$el;
    $product_categories_dropdown.addClass('dropdown-menu');
    this.$el.find('.site-header .instruments .dropdown-menu')
      .replaceWith($product_categories_dropdown);
  },

  showMobileMenu: function(ev) {
    this.mobile_menu_view.show();
  },

  hideMobileMenu: function(ev) {
    this.mobile_menu_view.hide();
  },

  toggleSiteMenu: function(ev) {
    if (this.$el.hasClass('show-nav')) {
      this.$el.removeClass('show-nav');
    } else {
      this.$el.addClass('show-nav');
    }
  },

  showNavDropdown: function(ev) {
    $(ev.currentTarget).addClass('open');
  },

  hideNavDropdown: function(ev) {
    $(ev.currentTarget).removeClass('open');
  },

  setPageTitle: function(content) {
    if (!content) {
      content = 'Los Angeles Percussion Rentals - Rent Percussion Instruments ' +
        'in L.A. and Southern California';
    } else {
      content += ' - Los Angeles Percussion Rentals';
    }
    $('title').text(content);
  },

  navigate: function(ev) {
    var url = $(ev.currentTarget).attr('href');
    this.$el.find('.dropdown.open').removeClass('open');
    Backbone.history.navigate(url, true);
    this.hideMobileMenu();
    return false;
  },

  attachKeydownHandler: function(handler) {
    $(window).on('keydown.app', handler);
  },

  detachKeydownHandler: function(handler) {
    $(window).off('keydown.app', handler);
  },

  detachKeydownHandlers: function() {
    $(window).off('keydown.app');
    global_events.off('disable-window-keydowns');
    global_events.off('enable-window-keydowns');
  },

  showProductsByCategory: function(category) {
    this.loadMainView('products-categories-search', ProductsSearchView);
    this.products.refs.selected_categories.setFromSlug(category);
    this.products.filterByCategory();
    return false;
  },

  showProductsByTags: function(tags) {
    this.loadMainView('products-tags-search', ProductsTagsSearchView);
    this.products.refs.selected_tags.setFromArray(tags);
    this.products.filterByTags();
    return false;
  },

  showProductsByTextSearch: function(search) {
    this.loadMainView('products-text-search', TextSearchResultsView);
    this.products.filterByTextSearch(search);
    return false;
  },

  showProductDetails: function(product_id, hide_nav) {
    this.showMain();
    var product = this.products.findWhere({
      _id: Number(product_id)
    });
    if (!product) {
      return this.showServerError();
    }
    var product_view = new ProductDetailsView({
      model: product,
      refs: this.products.refs
    });
    if (this.$main.find('.product-details').length) {
      product_view.setElement(this.$main.find('.product-details'));
      product_view.render();
    } else {
      if (window.__lapr_ssr) {
        // Load index "underneath" if this is being rendered on the server
        const index_view = new IndexView;
        this.$el.removeClass().addClass('index');
        this.$main.empty().append(index_view.render().el);
      }
      var list_nav_view = new ListNavLinksView({
        collection: this.products.refs.filtered_products,
        model: product,
        label: 'Instrument',
        base_url_path: '/instruments/'
      });
      this.showContentPanel(product_view, list_nav_view, hide_nav);
    }
    return false;
  },

  showContentPanel: function(content_view, list_nav_view, hide_nav) {
    this.disableDocumentScroll();
    // In case handlers from previous content panels were not cleared, clear
    // them here
    this.detachKeydownHandlers();
    // Get rid of existing
    if (this.content_panel_view) {
      this.content_panel_view.remove();
    }

    // Render content_view inside content panel
    this.content_panel_view = new ContentPanelView;
    const $content_panel = this.content_panel_view.render(
      content_view.render().el
    ).el;
    // If server-rendered, #content-panel will already exist
    if (this.$el.find('#content-panel').length) {
      this.$el.find('#content-panel').replaceWith($content_panel);
    } else {
      this.$el.prepend($content_panel);
    }
    // Attach keydown handlers
    this.attachKeydownHandler(_.bind(this.content_panel_view.onKeydown,
      this.content_panel_view));
    // List navigation ("previous", "next", etc.)
    if (list_nav_view) {
      var bound_list_nav_keydown = _.bind(list_nav_view.onKeydown, list_nav_view);
      if (!hide_nav) {
        this.content_panel_view.setNav(list_nav_view.render().el);
        this.attachKeydownHandler(bound_list_nav_keydown);
      } else {
        this.content_panel_view.clearNav();
        this.detachKeydownHandler(bound_list_nav_keydown);
      }
    }
    // Keydown handler enable/disable, for admin modals, etc.
    global_events.on('disable-window-keydowns', () => {
      if (list_nav_view) {
        list_nav_view.disableKeydowns();
      }
      this.content_panel_view.disableKeydowns();
    });
    global_events.on('enable-window-keydowns', () => {
      if (list_nav_view) {
        list_nav_view.enableKeydowns();
      }
      this.content_panel_view.enableKeydowns();
    });

    global_events.trigger('content-panel-opened');
    // Cleanup -- on panel hide
    this.content_panel_view.on('hidden', () => {
      this.enableDocumentScroll();
      this.detachKeydownHandlers();
      if (this.content_panel_view) {
        this.content_panel_view.close();
        this.content_panel_view = null;
      }
      if (list_nav_view) {
        list_nav_view.close();
      }
      content_view.close();
      global_events.trigger('content-panel-closed');
      Backbone.history.back();
    });
  },

  showContact: function() {
    this.loadMainView('contact', ContactView);
  },

  showIndex: function() {
    this.loadMainView('index', IndexView);
  },

  showMain: function() {
    //this.$main.fadeIn(1000);
  },

  disableDocumentScroll: function() {
    document.documentElement.style.overflow = 'hidden'; // firefox, chrome
    document.body.scroll = 'no'; // ie
  },

  enableDocumentScroll: function() {
    document.documentElement.style.overflow = 'visible';
    document.body.scroll = 'yes';
  },

  // Loads a view into #main
  loadMainView: function(class_name, View) {
    if (this.content_panel_view) {
      this.content_panel_view.hide();
      this.content_panel_view = null;
    }
    this.$el.removeClass().addClass(class_name);
    if (!(this.current_view instanceof View)) {
      if (this.current_view) {
        this.current_view.close();
      }
      this.current_view = new View({
        products: this.products
      });
      this.$main.html(this.current_view.render().el);
    }
    this.showMain();
    return false;
  }
});

