/**
 * Mobile menu view
 * 
 */
define([
  'views/base',
  //'views/overlay',
  'template'
], function(
  BaseView,
  //OverlayView,
  template
) {
  
  return BaseView.extend({
    
    el: 'body',

    events: {
      'click #mobile-menu li a':          'hide',
      'click #mobile-menu a.navigate':    'navigate'
    },

    initialize: function(opts) {
    },
    
    render: function() {
      this.$el.append(template.render('partials/mobile_menu', {
        product_categories: this.collection.toJSON()
      }));
      this.$mobile_menu = this.$el.find('#mobile-menu');
      return this;
    },

    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href');
      Backbone.history.navigate(url, true);
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

    show: function($content) {
      var obj = this;
      this.$mobile_menu.stop().animate({ opacity: 1, left: 0 }, function() {
        obj.trigger('shown');
        obj.disableDocumentScroll();
      });
    },

    hide: function() {
      this.enableDocumentScroll();
      var obj = this;
      this.$mobile_menu.stop().animate({ opacity: 0 }, function() {
        obj.$mobile_menu.css('left', '-100%');
        obj.trigger('hidden');
      });
    },

    onClose: function() {
    }

  });
});

