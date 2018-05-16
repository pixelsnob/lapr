/**
 * Youtube Videos view
 * 
 */
import ListBaseView from './base';
import YoutubeVideoView from './items/youtube_video';

export default ListBaseView.extend({

  view: YoutubeVideoView,
  title: 'Youtube Videos',

  initialize: function(opts) {
    this.products = opts.products;
    ListBaseView.prototype.initialize.apply(this, arguments);
  },

  render: function() {
    var $table = this.$el.find('table');
    $table.empty();
    this.collection.each(model => {
      var view = new this.view({
        model: model,
        collection: this.collection,
        products: this.products
      });
      $table.append(view.render().el);
    });
    return this;
  }


});

