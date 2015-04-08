/**
 * content_blocks view
 * 
 */
define([
  'views/base',
  'views/content_block',
  'template'
], function(
  BaseView,
  ContentBlockView,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
    },
    
    render: function() {
      var $content_blocks = this.$el.find('.content-block');
      $content_blocks.each(function() {
        var view = new ContentBlockView({ el: $(this) });
        view.render();
      });
      return this;
    }

  });
});

