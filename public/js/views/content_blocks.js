/**
 * content_blocks view, returns an instance 
 * 
 * 
 */
import BaseView from 'views/base';
import ContentBlockView from 'views/content_block';
import ContentBlocksCollection from 'collections/content_blocks';
import template from 'template';

var View = BaseView.extend({

  events: {},

  initialize: function(opts) {
    this.collection = new ContentBlocksCollection;
    this.deferred = this.collection.fetch();
  },

  // Looks for all .content-block elements and render them
  render: function() {
    this.deferred.then(() => {
      var $content_blocks = this.$el.find('.content-block');
      Array.from($content_blocks).forEach($content_block => {
        var $el = $($content_block),
          name = $el.attr('data-name'),
          id = $el.attr('data-id'),
          model;
        if (name) {
          model = this.collection.findWhere({
            name: name
          });
        } else {
          model = this.collection.findWhere({
            _id: Number(id)
          });
        }
        var view = new ContentBlockView({
          model: model
        });
        $el.html(view.render().el);
      });
    });
    return this;
  }
});

export default new View;

