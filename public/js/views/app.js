/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/tags_tree',
  'views/categories_nav',
  'views/products_categories_search',
  'views/products_tags_search',
  'collections/products'
], function(
  BaseView,
  ProductsView,
  TagsTreeView,
  CategoriesNavView,
  ProductsCategoriesSearchView,
  ProductsTagsSearchView,
  ProductsCollection
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click nav li a.navigate': 'navigate'
    },

    initialize: function() {
      this.products = new ProductsCollection;
      this.deferred = this.products.fetch();
      var obj = this;
      if (window.cms.user) {
        require([ 'views/admin/product', 'views/admin/tag_categories' ],
        function(ProductAdminView, TagCategoriesAdminView) {
          // This is on the body so probably shouldn't be in here anyway...
          $('.add-product').on('click', _.bind(obj.add, obj, ProductAdminView));
          $('.edit-tag-categories').on('click', _.bind(obj.editTagCategories, obj,
            TagCategoriesAdminView));
        });
      }
    },

    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href'),
          $dd = $(ev.currentTarget).parents('.dropdown-menu');
      if ($dd.length) {
        $dd.prev('.dropdown-toggle').dropdown('toggle');
      }
      Backbone.history.navigate(url, true);
      return false;
    },
    
    showProductsByCategory: function(category) {
      var obj = this;
      this.deferred.done(function() {
        if (!obj.$el.find('#main .products-categories-search').length) {
          obj.categories_search_view = new ProductsCategoriesSearchView({
            products: obj.products
          });
          obj.products.refs.selected_categories.trigger('unbind');
          obj.$el.find('#main').html(obj.categories_search_view.render().el);
        }
        obj.categories_search_view.filter(category);
      });
      return false;
    },
    
    showProductsByTags: function(tags) {
      var obj = this;
      this.deferred.done(function() {
        if (!obj.$el.find('#main .products-tags-search').length) {
          // cheat so i don't have to unbind events from old views
          obj.products.refs.selected_tags.trigger('unbind');
          //obj.products.refs.selected_tags = new Backbone.Collection;
          obj.tags_search_view = new ProductsTagsSearchView({
            products: obj.products
          });
          obj.$el.find('#main').html(obj.tags_search_view.render().el);
        }
        obj.tags_search_view.filter(tags);
      });
      return false;
    },

    add: function(ProductAdminView) {
      var view = new ProductAdminView({
        model:              this.model,
        refs:               this.products.refs,
        mode:               'add'
      });
      view.renderModal();
      var obj = this;
      // Add to collection if save is successful
      this.listenTo(view, 'save', function(model) {
        obj.collection.add(model);
      });
      return true; // true so that BS dropdown closes
    },

    editTagCategories: function(TagCategoriesAdminView) {
      var view = new TagCategoriesAdminView({
        collection: this.products.refs.tag_categories
      });
      view.renderModal();
      var obj = this;
      // Add to collection if save is successful
      this.listenTo(view, 'save', function(model) {
        obj.collection.add(model);
      });
      return true; // true so that BS dropdown closes
    }

  });
});

