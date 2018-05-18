/**
 * Mobile menu view
 * 
 */
import BaseView from 'views/base';
import ProductsTextSearchView from 'views/products/text_search';
import template from 'template';

export default BaseView.extend({

  el: 'body',

  events: {
    'click #mobile-menu li a': 'hide',
    'click #mobile-menu a.navigate': 'navigate'
  },

  initialize: function(opts) {
    this.shown = false;
    this.products = opts.products;
  },

  render: function() {
    this.$el.append(template.render('partials/mobile_menu', {
      product_categories: this.products.refs.product_categories.toJSON()
    }));
    this.$mobile_menu = this.$el.find('#mobile-menu');
    return this;
  },

  navigate: function(ev) {
    var url = $(ev.currentTarget).attr('href');
    Backbone.history.navigate(url, true);
    return false;
  },

  disableDocumentScroll: function() {
    document.documentElement.style.overflow = 'hidden'; // firefox, chrome
    document.body.scroll = 'no'; // ie
  },

  enableDocumentScroll: function() {
    document.documentElement.style.overflow = 'visible';
    document.body.scroll = 'yes';
  },

  show: function($content) {
    if (!this.shown) {
      this.shown = true;
      var text_search_view = new ProductsTextSearchView({
        products: this.products,
        input_id: 'mobile-text-search'
      });
      this.listenTo(text_search_view, 'selected', () => {
        //text_search_view.blur();
        this.hide();
      });
      this.$mobile_menu.find('.text-search').append(text_search_view.render().el);
    }
    this.$mobile_menu.stop().animate({
      opacity: 1,
      left: 0
    }, () => {
      this.trigger('shown');
      this.disableDocumentScroll();
    });
    // Hide if back or forward buttons are hit
    window.onpopstate = this.hide.bind(this);
  },

  hide: function() {
    this.enableDocumentScroll();
    this.$mobile_menu.stop().animate({
      opacity: 0
    }, () => {
      this.$mobile_menu.css('left', '-100%');
      this.trigger('hidden');
      window.onpopstate = null;
    });
  },

  onClose: function() {}

});

