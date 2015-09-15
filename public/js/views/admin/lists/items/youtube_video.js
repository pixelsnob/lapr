/**
 * Youtube video view
 * 
 */
define([
  './base',
  'models/youtube_video',
  'forms/youtube_video',
  'template'
], function(
  ListItemBaseView,
  YoutubeVideoModel,
  YoutubeVideoForm,
  template
) {
  
  return ListItemBaseView.extend({
    label: 'youtube video',
    title: 'Youtube Video',
    
    model: new YoutubeVideoModel,
    
    form_obj: YoutubeVideoForm,

    initialize: function(opts) {
      this.products = opts.products;
      ListItemBaseView.prototype.initialize.apply(this, arguments);
    },

    render: function() {
      this.$el.children().remove();
      this.$el.append(template.render('admin/youtube_video_list_item',
        this.model.toJSON())); 
      var obj = this;
      // Show a message if there's an issue accessing the video
      this.model.getVideoJSON().done(function() {
        var badge = $('<span>').addClass('label label-success').text('OK');
        obj.$el.find('.warning-container').append(badge);
      }).fail(function() {
        var badge = $('<span>').addClass('label label-danger').text('Problem!');
        obj.$el.find('.warning-container').append(badge);
      });
      var ref_products = [];
      this.products.map(function(product) {
        var product = product.toJSON();
        if (product.youtube_videos && _.isArray(product.youtube_videos)) {
          var products = product.youtube_videos.filter(function(video) {
            return video == obj.model.id;
          }).map(function(video) {
            return product.name;
          });
          if (products.length) {
            products.forEach(function(_product) {
              ref_products.push(_product);
            });
          }
        }
      });
      if (ref_products.length) {
        this.$el.find('.name-container .products').text(ref_products.join(', '));
      }
      return this;
    }
    
  });
  
});

