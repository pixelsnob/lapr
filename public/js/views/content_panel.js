/**
 * View for content panel that slides in, as an alternative to a modal
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
    
    el: 'body',

    events: {
      'click .content-panel-close a':  'hide'
    },
    
    initialize: function() {
      var obj = this;
      this.shown = false;
    },
    
    show: function(ev) {
      this.$tpl.css('display', 'block');
      this.trigger('shown');
      this.shown = true;
      var obj = this;
      this.$tpl.stop().animate({ opacity: 1 }, 50, function() {
        obj.disableDocumentScroll();
      });
      $(window).on('keydown', function(ev) {
        if (ev.keyCode == 27) {
          obj.hide();
        }
      });
      return false;
    },
    
    hide: function(trigger) {
      this.enableDocumentScroll();
      if (!this.shown) {
        return false;
      }
      this.shown = false;
      if (trigger !== false) {
        this.trigger('hidden');
      }
      var obj = this;
      this.$tpl.stop().animate({ opacity: 0 }, 200, function() {
        obj.$tpl.css('display', 'none');
        obj.$tpl.remove();
      });
      $(window).off('keydown');
      return false;
    },
    
    hideIfOverlay: function(ev) {
      if ($(ev.target).attr('id') == 'content-panel') {
        this.hide();
      }
    },

    disableDocumentScroll: function() {
      document.documentElement.style.overflow = 'hidden'; // firefox, chrome
      document.body.scroll = 'no'; // ie
    },

    enableDocumentScroll: function() {
      document.documentElement.style.overflow = 'visible';
      document.body.scroll = 'yes';
    },
    
    render: function(child_el) {
      this.$tpl = template.render('partials/content_panel');
      this.$tpl.on('click', _.bind(this.hideIfOverlay, this));
      this.$tpl.find('.content').html(child_el);
      this.$el.find('#content-panel').remove();
      this.$el.prepend(this.$tpl);
      return this;
    },
    
    setNav: function($nav) {
      this.$tpl.find('.nav-container').prepend($nav);
    },

    // Override close method so we don't remove() the entire body
    close: function() {
      this.enableDocumentScroll();
      var $tpl = this.$tpl;
      $tpl.stop().animate({
        opacity: 0
      }, 200, function() {
        $tpl.remove();
        $tpl.off();
      });
      this.off('click');
    }

  });

});

