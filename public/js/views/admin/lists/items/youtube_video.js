/**
 * Youtube video view
 * 
 */
import ListItemBaseView from './base';
import YoutubeVideoModel from 'models/youtube_video';
import YoutubeVideoForm from 'forms/youtube_video';
import template from 'template';
import Promise from 'lib/promise';

export default ListItemBaseView.extend({
  label: 'youtube video',
  title: 'Youtube Video',

  model: new YoutubeVideoModel,

  form_obj: YoutubeVideoForm,

  initialize: function(opts) {
    this.products = opts.products;
    ListItemBaseView.prototype.initialize.apply(this, arguments);
  },

  showStatusBadge: function(type, text) {
    var $warning_container = this.$el.find('.warning-container');
    var $label = $('<span>').addClass(`label label-${type}`).text(text);
    $warning_container.append($label);
  },

  render: function() {
    this.$el.children().remove();
    this.$el.append(template.render('admin/youtube_video_list_item',
      this.model.toJSON()));
    // Show a message if there's an issue accessing the video
    this.model.getPublishedVideos().then(videos => {
      if (videos.length) {
        this.showStatusBadge('success', 'OK');
      } else {
        this.showStatusBadge('danger', 'Problem!');
      }
    }).catch(err => {
      this.showStatusBadge('default', 'No data!');
    });
    var ref_products = [];
    this.products.map(product => {
      var product = product.toJSON();
      if (product.youtube_videos && _.isArray(product.youtube_videos)) {
        var products = product.youtube_videos.filter(video => {
          return video == this.model.id;
        }).map(video => {
          return product.name;
        });
        if (products.length) {
          products.forEach(_product => {
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

