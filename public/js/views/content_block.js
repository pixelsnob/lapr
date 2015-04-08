/**
 * content_block view
 * 
 */
define([
  'views/base',
  'models/content_block',
  'views/content_block',
  'lib/markdown',
  'template'
], function(
  BaseView,
  ContentBlockModel,
  ContentBlockView,
  markdown,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.model = new ContentBlockModel;
      var name = this.$el.attr('data-content-block-name');
      this.deferred = this.model.fetch({
        url: this.model.url() + 'name/' + name
      });
    },
    
    render: function() {
      var obj = this;
      this.deferred.done(function() {
        var content = obj.model.get('content');
        if (obj.model.get('type') == 'markdown') {
          content = markdown(content);
        }
        obj.$el.find('.content').html(content);
      });
      return this;
    }

  });
});

