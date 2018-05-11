/**
 * Top-level app view
 * 
 */
import BaseView from 'views/base';
import ProductsView from 'views/products';
import ProductsSearchView from 'views/products/categories_search';
import ProductsTagsSearchView from 'views/products/tags_search';
import ProductsTextSearchResultsView from 'views/products/text_search_results';
import TextSearchView from 'views/text_search';
import ProductDetailsView from 'views/product/details';
import ListNavLinksView from 'views/list_nav_links';
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
    var obj = this;
    this.products.deferred.done(function() {
      var text_search_view = new TextSearchView({
        products: obj.products,
        input_id: 'text-search'
      });
      obj.$el.find('header .text-search').append(text_search_view.render().el);
      obj.mobile_menu_view = new MobileMenuView({
        products: obj.products
      });
      obj.mobile_menu_view.render();
    });
  },

  showMobileMenu: function(ev) {
    var obj = this;
    this.products.deferred.done(function() {
      obj.mobile_menu_view.show();
    });
  },

  hideMobileMenu: function(ev) {
    var obj = this;
    this.products.deferred.done(function() {
      obj.mobile_menu_view.hide();
    });
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
    var obj = this;
    this.products.deferred.done(function() {
      obj.loadMainView('products-categories-search', ProductsSearchView);
      obj.products.refs.selected_categories.setFromSlug(category);
      obj.products.filterByCategory();
    });
    return false;
  },

  showProductsByTags: function(tags) {
    var obj = this;
    this.products.deferred.done(function() {
      obj.loadMainView('products-tags-search', ProductsTagsSearchView);
      obj.products.refs.selected_tags.setFromArray(tags);
      obj.products.filterByTags();
    });
    return false;
  },

  showProductsByTextSearch: function(search) {
    var obj = this;
    this.products.deferred.done(function() {
      obj.loadMainView('products-text-search', TextSearchResultsView);
      obj.products.filterByTextSearch(search);
    });
    return false;
  },

  showProductDetails: function(product_id, hide_nav) {
    var obj = this;
    this.showMain();
    this.products.deferred.done(function() {
      var product = obj.products.findWhere({
        _id: Number(product_id)
      });
      if (!product) {
        return obj.showServerError();
      }
      var product_view = new ProductDetailsView({
        model: product,
        refs: obj.products.refs
      });
      if (obj.$main.find('.product-details').length) {
        product_view.setElement(obj.$main.find('.product-details'));
        product_view.render();
      } else {
        var list_nav_view = new ListNavLinksView({
          collection: obj.products.refs.filtered_products,
          model: product,
          label: 'Instrument',
          base_url_path: '/instruments/'
        });
        obj.showContentPanel(product_view, list_nav_view, hide_nav);
      }
    });
    return false;
  },

  showContentPanel: function(content_view, list_nav_view, hide_nav) {
    var obj = this;
    this.disableDocumentScroll();
    // In case handlers from previous content panels were not cleared, clear
    // them here
    this.detachKeydownHandlers();
    // Get rid of existing
    if (this.content_panel_view) {
      this.content_panel_view.remove();
    }
    this.content_panel_view = new ContentPanelView;
    // Render content_view inside content panel
    this.$el.prepend(
      this.content_panel_view.render(
        content_view.render().el
      ).el
    );
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
    global_events.on('disable-window-keydowns', function() {
      if (list_nav_view) {
        list_nav_view.disableKeydowns();
      }
      obj.content_panel_view.disableKeydowns();
    });
    global_events.on('enable-window-keydowns', function() {
      if (list_nav_view) {
        list_nav_view.enableKeydowns();
      }
      obj.content_panel_view.enableKeydowns();
    });

    global_events.trigger('content-panel-opened');
    // Cleanup -- on panel hide
    this.content_panel_view.on('hidden', function() {
      obj.enableDocumentScroll();
      obj.detachKeydownHandlers();
      if (obj.content_panel_view) {
        obj.content_panel_view.close();
        obj.content_panel_view = null;
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
    this.$main.fadeIn(1000);
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

