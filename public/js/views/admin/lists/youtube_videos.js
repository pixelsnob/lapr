/**
 * Youtube Videos view
 * 
 */
define([
  './base',
  './items/youtube_video'
], function(
  ListBaseView,
  YoutubeVideoView
) {

  return ListBaseView.extend({
    
    view: YoutubeVideoView,
    title: 'Youtube Videos',
    
    initialize: function(opts) {
      this.products = opts.products;
      ListBaseView.prototype.initialize.apply(this, arguments);
    },

    render: function() {
      var obj    = this
          $table = this.$el.find('table');
      $table.empty();
      this.collection.each(function(model) {
        var view = new obj.view({
          model: model,
          collection: obj.collection,
          products: obj.products 
        });
        $table.append(view.render().el);
      });
      return this;
    }

    
  });
    
});

