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
    
    events: {
      'click .content-panel-close a':    'hide'
    },
    
    initialize: function() {
      var obj = this;
      this.on('hidden', function() {
        obj.$el.find('.content').empty();
      });
      this.shown = false;
      this.setElement(template.render('partials/content_panel'));
    },
    
    show: function(ev) {
      this.$el.css('display', 'block');
      this.trigger('shown');
      this.shown = true;
      var obj = this;
      this.$el.animate({ opacity: 1 }, 400, function() {
        obj.disableDocumentScroll();
      });
      return false;
    },
    
    hide: function(ev) {
      if (!this.shown) {
        return false;
      }
      this.shown = false;
      this.trigger('hidden');
      this.enableDocumentScroll();
      var obj = this;
      this.$el.stop().animate({ opacity: 0 }, 300, function() {
        obj.$el.css('display', 'none');
      });
      return false;
    },
    
    disableDocumentScroll: function() {
      document.documentElement.style.overflow = 'hidden'; // firefox, chrome
      document.body.scroll = 'no'; // ie
    },

    enableDocumentScroll: function() {
      document.documentElement.style.overflow = 'visible';
      document.body.scroll = 'yes';
    },
    
    onHistoryBack: function() {
      this.hide();
    },

    render: function(child_el) {
      this.$el.find('.content').html(child_el);
      return this;
    }

  });

});

