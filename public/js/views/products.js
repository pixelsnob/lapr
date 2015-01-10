/**
 * Products list view
 * 
 */
define([
  'views/base',
  'views/product',
], function(
  BaseView,
  ProductView
) {
  
  return BaseView.extend({

    events: {
      'click .pagination .previous': 'getPreviousPage',
      'click .pagination .next':     'getNextPage'
    },

    initialize: function(opts) {
      this.collection = opts.collection;
      this.refs = this.collection.refs;
      this.setElement(opts.el);
      // Include product admin editor if admin user
      if (window.cms.user) {
        var obj = this;
        require([ 'views/admin/product' ], function(ProductAdminView) {
          var events = {
            'click a.add-product': _.bind(obj.add, obj, ProductAdminView)
          };
          obj.delegateEvents(_.extend(obj.events, events));
        });
      }
      this.listenTo(this.refs.filtered_products, 'add reset change', this.render);
      this.tagged_products = this.collection.filter(function(product) {
        var tags = product.get('tags');
        return _.isArray(tags) && tags.length;
      });
      //console.log(this.tagged_products);
    },
    
    showProducts: function(){
      this.refs.filtered_products.state.currentPage = 0;
      this.refs.filtered_products.fullCollection.reset(this.collection.models);
    },

    render: function() {
     // var fragment = document.createDocumentFragment(),
      var obj      = this,
          $tbody   = this.$el.find('tbody');
      $tbody.empty();
      this.refs.filtered_products.forEach(function(product) {
        var view = new ProductView({
          model:              product,
          products:           obj.collection,
          refs:               obj.refs
        });
        //fragment.appendChild(view.render().el);
        $tbody.append(view.render().el);
      });
      //this.$el.find('tbody').html(fragment);
      //console.log('render');
      return this;
    },
    
    getPreviousPage: function(ev) {
      if (this.refs.filtered_products.state.currentPage > 0) {
        this.refs.filtered_products.getPreviousPage();
      }
      return false;
    },

    getNextPage: function(ev) {
      var state = this.refs.filtered_products.state;
      if (state.currentPage + 1 < state.totalPages) {
        this.refs.filtered_products.getNextPage();
      }
      return false;
    },

    filterProductsByTags: function(slugs) {
      //console.log('filterProductsByTags');
      slugs = _.isArray(slugs) ? slugs : [];
      // Get tag _ids from slugs
      var tag_ids = this.refs.tags.filter(function(tag) {
        return _.contains(slugs, tag.get('slug'));
      }).map(function(tag) {
        return tag.get('_id');
      });
      // Filter products by tags
      var products = this.tagged_products.filter(function(product) {
        if (!tag_ids.length) {
          return _.isArray(product.get('tags')) && product.get('tags').length;
        }
        var temp_tag_ids = tag_ids.filter(function(tag_id) {
          return _.contains(product.get('tags'), tag_id);
        });
        // Filter product if all of the selected tags exist in the product's
        // tags array
        return temp_tag_ids.length == tag_ids.length;
      });
      this.refs.filtered_products.state.currentPage = 0;
      this.refs.filtered_products.fullCollection.reset(products);
    },
    
    // ?????
    /*showByCategory: function(slug) {
      var obj = this;
      var products = this.collection.filter(function(product) { 
        return _.some(product.get('categories'), function(id) {
          var category = obj.refs.product_categories.findWhere({ _id: id });
          if (!category) {
            return;
          }
          return category.get('slug') == slug;
        });
      });
      this.render(products);// <<<<<<<<<<<< instead set filtered collection here
      return false;
    },*/

    add: function(ProductAdminView) {
      var view = new ProductAdminView({
        model:              this.model,
        refs:               this.refs,
        mode:               'add'
      });
      view.renderModal();
      var obj = this;
      // Add to collection if save is successful
      this.listenTo(view, 'save', function(model) {
        obj.collection.add(model);
      });
      return false;
    }


  });
  
});
