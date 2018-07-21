/**
 * Youtube videos collection
 * 
 */
import YoutubeVideoModel from '../models/youtube_video';

export default Backbone.Collection.extend({

  url: '/api/youtube-videos',

  model: YoutubeVideoModel,

  comparator: 'name',

  initialize: function() {}
});
