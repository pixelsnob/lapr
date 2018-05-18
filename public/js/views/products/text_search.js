/**
 * Products text search form
 * 
 */
import BaseView from 'views/base';
import ProductsCollection from 'collections/products';
import TextSearchProductsView from './text_search/products';
import ProductView from './text_search/product';
import TextSearchForm from 'forms/text_search';
import template from 'template';
import global_events from 'lib/events';

export default BaseView.extend({

  events: {},

  initialize: function(opts) {
    this.products = opts.products;
    this.products.createProductsIndex();
    this.form = new TextSearchForm;
    this.search_results_collection = new ProductsCollection;
    this.products_view = new TextSearchProductsView({
      collection: this.search_results_collection
    });
    this.listenTo(this.products_view, 'selected', () => this.trigger('selected'));
    this.listenTo(global_events, 'content-panel-closed', () => {
      this.getInputElement().focus();
    });
    this.listenTo(this.products, 'add change remove', model => {
      this.products.createProductsIndex();
      this.render();
    });
  },

  getFormContainerElement: function() {
    return this.$el.find('.form');
  },

  getInputElement: function() {
    return this.form.$el.find('input[type="text"]');
  },
  
  getProductsListElement: function() {
    return this.$el.find('.products-list');
  },

  render: function() {
    this.$el.html(template.render('partials/products_text_search'));
    var $form = this.form.render().$el;
    $form.attr({
      autocomplete: 'off',
      spellcheck: 'false',
      tabindex: '1'
    });
    this.getFormContainerElement().append($form);
    this.getProductsListElement().append(this.products_view.render().el);
    this.getInputElement()
      .on('keyup', ev => this.inputOnKeyup())
      .on('blur', ev => this.inputOnBlur());
    return this;
  },
  
  inputOnKeyup: function() {
    var $products = this.getProductsListElement();
    var search_results = this.products.getSearchResults(this.getInputElement().val(), 50);
    this.search_results_collection.reset(search_results);
    if (this.search_results_collection.models.length) {
      $products.show();
    } else {
      $products.hide();
    }
  },
  
  inputOnBlur: function(ev) {
    // Hack: make sure blur doesn't cause dropdown to immediately close
    setTimeout(() => {
      var $input = this.getInputElement();
      if ($input.length) {
        $input.val('');
        setTimeout(() => {
          this.getProductsListElement().hide();
        }, 0);
      }
    }, 300);
  }
  
});

