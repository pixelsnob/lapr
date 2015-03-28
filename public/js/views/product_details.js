/**
 * Product details view
 * 
 */
define([
  'views/base',
  'views/modal',
  'views/product_details_image',
  'views/product_details_more_info',
  'views/product_range',
  'views/youtube_player',
  'views/image_onload',
  'template'
], function(
  BaseView,
  ModalView,
  ProductDetailsImageView,
  ProductDetailsMoreInfoView,
  RangeView,
  YoutubePlayerView,
  ImageOnloadView,
  template
) {
  
  return BaseView.extend({
    
    events: {
      'click .image':      'showImageModal',
      'click .more-info':  'showMoreInfoModal'
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
      var obj = this;
      $(window).on('resize', function(ev) {
        obj.$el.find('.image img').css({ width: '100%', position: 'static' });
      });
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
      }
      // Range notation, if any
      if (product.range && product.range.length) {
        var range_view = new RangeView({ range: product.range });
        this.$el.find('.range').html(range_view.render().el);
      }
      // Image loading stuff
      if (product.image && product.image.length) {
        var image_onload_view = new ImageOnloadView({
          el:    this.$el.find('.image'),
          src:   '/images/' + product.image
        });
      }
      if (product.more_info) {
        this.$el.find('.more-info').show();
      }
      return this;
    },
    
    renderModal: function(opts) {
      //$('.content-tray').addClass('product-details').animate({ left: 0 }, 200).html(this.render().el);
      //return;
      this.render();
      var modal_view = new ModalView;
      modal_view.$el.addClass('product-details');
      modal_view.render({
        body: this.$el
      });
      var obj = this;
      this.listenTo(modal_view, 'close', _.bind(this.trigger, this, 'close'));
    },

    showImageModal: function() {
      //var view = new ProductDetailsImageView({ model: this.model });
      //view.renderModal();
      var $img  = this.$el.find('.image img'),
          $tray = $('.content-tray'),
          w     = $tray.width(),
          h     = $tray.height();
      console.log(w, h);
      if ($img.width() >= $img.height()) {
        console.log('w');
        $img.animate({ width: w - 20 }, 400);
      } else {
        console.log('h');
        $img.animate({ height: h - 20 }, 400);
      }
    },

    showMoreInfoModal: function() {
      var view = new ProductDetailsMoreInfoView({ model: this.model });
      view.renderModal();
    },

    close: function() {
      BaseView.prototype.close.apply(this, arguments);      
      this.trigger('modal-close');
    }

  });
});

