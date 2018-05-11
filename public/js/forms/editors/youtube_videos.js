/**
 * Tags multiselect
 * 
 * 
 */
import Backbone from 'backbone';
import MultiSelectEditorView from './multi_select';
import YoutubeVideosView from 'views/admin/lists/youtube_videos';
import 'backbone-forms';

export default MultiSelectEditorView.extend({

  initialize: function(opts) {
    MultiSelectEditorView.prototype.initialize.apply(this, arguments);
  },

  edit: function() {
    // Youtube videos list needs products collection
    var view = new YoutubeVideosView({
      collection: this.schema.options,
      products: this.model.collection
    });
    view.renderModal();
    this.listenTo(view, 'close', this.refresh);
  }

});
