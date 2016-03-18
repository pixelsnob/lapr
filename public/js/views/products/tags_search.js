/**
 * Products search by tags
 * 
 */
define([
  'views/base',
  'views/products',
  'views/navs/tags',
  './search_stats',
  'template',
  'lib/events'
], function(
  BaseView,
  ProductsView,
  TagsNavView,
  ProductsSearchStatsView,
  template,
  global_events
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
      this.listenTo(this.products.refs.selected_tags, 'reset', function() {
        this.$el.find('.boxes-list').scrollTop(0);
        $(window).scrollTop(0);
      });
      var obj  = this,
          refs = this.products.refs;
      // If a product is added to the collection, and the product contains some of the currently
      // selected tags, or no tags are selected and the product contains at least one tag,
      // add it to the filtered list
      this.listenTo(this.products, 'add', function(model) {
        var product_tags = model.get('tags');
        if (!product_tags.length) {
          return;
        }
        var sel_tag_ids = refs.selected_tags.map(function(tag) {
          return tag.id;
        });
        var hasSomeTags = function(tag_id) {
          return _.contains(product_tags, tag_id);
        };
        if (!sel_tag_ids.length || _.some(sel_tag_ids, hasSomeTags)) {
          refs.filtered_products.add(model);
          model.highlight = true;
          obj.products_view.render();
        }
      });
    },
    
    render: function() {
      this.$el.html(template.render('partials/products_search', {
        products:   [],
        paginate:   null,
        heading:    'Sound Search',
        class_name: 'products-tags-search'
      }));
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

