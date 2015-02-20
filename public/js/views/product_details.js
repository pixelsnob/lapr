/**
 * Product details view
 * 
 */
define([
  'views/base',
  'views/modal',
  'views/product_details_image',
  'views/youtube_player',
  'template'
], function(
  BaseView,
  ModalView,
  ProductDetailsImageView,
  YoutubePlayerView,
  template
) {
  
  return BaseView.extend({
    
    events: {
      'click .image': 'showImageModal'
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      var makers      = this.model.get('makers'),
          product     = this.model.toJSON(),
          obj         = this,
          makers_list = '';
      if (_.isArray(makers)) {
        makers_list = makers.map(function(maker_id) {
          var maker = obj.refs.makers.findWhere({ _id: maker_id });
          return maker;
        }).join(', ');
      }
      this.$el.html(template.render('partials/product_details', {
        product: product,
        makers:  makers_list
      }));
      var youtube_id = this.model.get('youtube_id');
      if (youtube_id) {
        var yt_view = new YoutubePlayerView({
          youtube_id: youtube_id,
          caption:    this.model.get('youtube_caption')
        });
        this.$el.find('.video').html(yt_view.render().el);
      }
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      var modal_view = new ModalView;
      modal_view.$el.addClass('product-details');
      modal_view.render({
        body: this.$el
      });
      this.listenTo(modal_view, 'hide', this.close);
    },

    showImageModal: function() {
      var view = new ProductDetailsImageView({ model: this.model });
      view.renderModal();
    }
    
  });
});

