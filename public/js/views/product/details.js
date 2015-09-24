/**
 * Product details view
 * 
 */
define([
  'views/base',
  './details_image',
  './details_more_info',
  './range',
  'views/youtube_player',
  'views/image_onload',
  'views/content_blocks',
  'template'
], function(
  BaseView,
  ProductDetailsImageView,
  ProductDetailsMoreInfoView,
  RangeView,
  YoutubePlayerView,
  ImageOnloadView,
  content_blocks_view,
  template
) {
  
  return BaseView.extend({
    
    events: {
      'click .show-more-info':  'showMoreInfo',
      'click .previous a': 'previous',
      'click .next a': 'next'
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
      // Include product admin editor if admin user
      if (window.lapr.user) {
        var obj = this;
        require([ 'views/admin/product' ], function(ProductAdminView) {
          var events = {
            'click a.edit': _.bind(obj.edit, obj, ProductAdminView)
          };
          obj.delegateEvents(_.extend(obj.events, events));
        });
      }
    },
    
    render: function() {
      var product          = this.model.toJSON(),
          obj              = this;

      if (_.isArray(product.makers) && product.makers.length) {
        product.makers = product.makers.map(function(maker_id) {
          return obj.refs.makers.findWhere({ _id: maker_id });
        }).join(', ');
      }
      this.$el.html(template.render('partials/product_details', {
        product: product
      }));
      // Image loading stuff
      if (product.image && product.image.length) {
        var image_onload_view = new ImageOnloadView({
          el:           this.$el.find('.image'),
          src:          '/images/products/' + product.image
        });
        image_onload_view.render();
      }
      // Youtube videos
      var $youtube_player = this.$el.find('.youtube-player');
      $youtube_player.hide();
      if (_.isArray(product.youtube_videos) && product.youtube_videos.length) {
        var yt_view = new YoutubePlayerView({
          collection: product.youtube_videos.map(function(video_id) {
            return obj.refs.youtube_videos.findWhere({ _id: video_id });
          })
        });
        this.$el.find('.youtube-player').html(yt_view.render().el);
        $youtube_player.show();
        this.$el.find('.sounds-disclaimer').removeClass('hide');
      }
      // Range notation, if any
      if (product.range && product.range.length) {
        var range_view = new RangeView({ range: product.range });
        this.$el.find('.range').html(range_view.render().el);
      }
      // "More info" link
      if (product.more_info) {
        this.$el.find('.more-info-container').removeClass('hide');
      }
      content_blocks_view.setElement(this.$el).render();
      this.updateNavLinks();
      return this;
    },
    
    showMoreInfo: function() {
      this.$el.find('.more-info')
        .removeClass('hide')
        .addClass('expand').end()
        .find('.show-more-info').hide();
    },
    
    edit: function(ProductAdminView) {
      var view = new ProductAdminView({
        model:              this.model,
        refs:               this.model.collection.refs,
        mode:               'edit'
      });
      view.renderModal();
      this.listenTo(view, 'save', this.render);
      return false;
    },

    previous: function(ev) {
      var products = this.model.collection.refs.filtered_products;
      var previous = products.at(products.indexOf(this.model) - 1);
      if (previous) {
        var url = '/instruments/' + previous.get('slug') + '/' + previous.id;
        Backbone.history.navigate(url, false);
        this.model = previous;
        this.render();
      }
      return false;

    },

    next: function(ev) {
      var products = this.model.collection.refs.filtered_products;
      var next = products.at(products.indexOf(this.model) + 1);
      if (next) {
        var url = '/instruments/' + next.get('slug') + '/' + next.id;
        Backbone.history.navigate(url, false);
        this.model = next;
        this.render();
      }
      return false;
    },
    
    // Toggles previous/next links
    updateNavLinks: function() {
      var products = this.model.collection.refs.filtered_products,
          i        = products.indexOf(this.model);
      var $prev = this.$el.find('.previous'),
          $next = this.$el.find('.next');
      if (i == 0 || !products.length) {
        $prev.css('visibility', 'hidden');
      } else {
        $prev.css('visibility', 'visible');
      }
      if (i == products.length - 1 || !products.length) {
        $next.css('visibility', 'hidden');
      } else {
        $next.css('visibility', 'visible');
      }
    },

    close: function() {
      BaseView.prototype.close.apply(this, arguments);      
      this.trigger('modal-close');
    }

  });
});

