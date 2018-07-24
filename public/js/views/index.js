/**
 * Index page view
 * 
 */
define([
  'views/base',
  'views/content_blocks',
  'template',
  'lib/events'
], function(
  BaseView,
  content_blocks_view,
  template,
  global_events
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
    },
    
    render: function() {
      this.setElement(template.render('partials/index', { images: [] }));
      content_blocks_view.setElement(this.$el).render();
      var obj = this;
      content_blocks_view.deferred.done(function() {
        // For each column on index page, find the first link in the content, and attach an onlick
        // to the image that will follow that link
        [ '.index-left', '.index-middle', '.index-right' ].forEach(function(sel) {
          var $el = obj.$el.find(sel + ' .content');
          var $link = $el.find('a:eq(0)');
          if ($link.length && $link.attr('href')) {
            var href = $link.attr('href');
            var $img = $el.find('img:eq(0)');
            if ($img.length) {
              $img.click(function() {
                Backbone.history.navigate(href, true);
                return false;
              });
            }
            // Make link SPA-friendly, otherwise there will be a page
            // reload
            $link.href = 'javascript:void(0)';
            $link.click(function() {
              Backbone.history.navigate(href, true);
              return false;
            });
            if (sel == '.index-left') {
              obj.$el.find('.button-alert').attr('href', href);
            }
          }
        });
      });
      global_events.trigger('set-page-title', null);
      $(window).scrollTop(0);
      return this;
    },

    onClose: function() {
    }

  });
});

