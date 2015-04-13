/**
 * content_blocks view
 * 
 */
define([
  'views/base',
  'views/content_block',
  'models/content_block',
  'template'
], function(
  BaseView,
  ContentBlockView,
  ContentBlockModel,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
    },
    
    render: function() {
      var $content_blocks = this.$el.find('.content-block'),
          obj             = this;
      $content_blocks.each(function() {
        var model = new ContentBlockModel,
            view  = new ContentBlockView({ model: model }),
            $el   = $(this),
            name  = $el.attr('data-name');
        model.fetch({
          url: '/api/content-blocks/name/' + name
        }).done(function() {
          $el.html(view.render().el);
        });
      });
      return this;
    }

  });
});

