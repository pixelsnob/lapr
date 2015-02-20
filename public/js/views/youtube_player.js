/**
 * Basic youtube player
 * 
 */
define([
  'views/base',
  'template'
], function(
  BaseView,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.youtube_id = opts.youtube_id;
      this.caption = opts.caption;
      this.setElement(template.render('partials/youtube_player'));
      this.$iframe_container = this.$el.find('.iframe-container');
      this.$caption = this.$el.find('figcaption');
    },
    
    render: function() {
      var src = 'http://www.youtube.com/embed/' + this.youtube_id +
                '?autohide=1&modestbranding=1&showinfo=0';
      var $iframe = $('<iframe frameborder="0" id="ytplayer">').attr('src', src); 
      this.$iframe_container.html($iframe);
      this.$caption.text(this.caption);
      return this;
    }
  });
  
});
