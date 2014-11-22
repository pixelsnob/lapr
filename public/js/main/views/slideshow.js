/**
 * Markdown-based slideshow
 * 
 */
define([
  './base'
], function(
  BaseView
) {
  return BaseView.extend({
    el: 'body',
    events: {},
    interval_id: null,
    current_index: 0,

    initialize: function(opts) {
      var obj = this;
      this.interval_id = setInterval(function() {
        obj.next(); 
      }, 6000);
    },

    next: function() {
      // Normally would cache this but we want to get a fresh copy of the list
      // in case it is changed by the cms.
      var $list         = this.$el.find('#content-slideshow .content ul');
          $list_elements = $list.find('li');
      if ($list_elements.length <= 1) {
        return;
      }
      var $current       = $list_elements.eq(this.current_index),
          $next          = $list_elements.eq(this.current_index + 1);
      if ($next.length) {
        this.current_index++;
      } else {
        this.current_index = 0;
      }
      $current.fadeOut(1000);
      $list_elements.eq(this.current_index).fadeIn(1000);
    }
  });
});

