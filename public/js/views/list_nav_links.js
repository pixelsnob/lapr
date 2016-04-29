/**
 * "Previous" and "next" links for lists
 * 
 */
define([
  'views/base',
  'template',
  'lib/events'
], function(
  BaseView,
  template,
  global_events
) {
  return BaseView.extend({ 
    
    events: {
      'click .previous a': 'previous',
      'click .next a':     'next'   
    },
     
    initialize: function(opts) {
      this.base_url_path = opts.base_url_path;
      this.previous_url = opts.previous_url;
      this.next_url = opts.next_url;
      this.setElement(template.render('partials/list_nav_links',
        { label: opts.label })); 
    },

    render: function() { 
      this.updateNavLinks();
      return this;
    },

    previous: function(ev) {
      var i = this.collection.indexOf(this.model);
      if (i < 1) {
        return false;
      }
      var previous = this.collection.at(i - 1);
      if (previous) {
        this.trigger('previous', previous);
        this.model = previous;
        this.render();
        var url = this.base_url_path + previous.get('slug') + '/' + previous.id;
        Backbone.history.navigate(url, true);
      }
      return false;
    },
    
    next: function(ev) {
      var i = this.collection.indexOf(this.model);
      if (i == -1 || i == this.collection.length - 1) {
        return false;
      }
      var next = this.collection.at(i + 1);
      if (next) {
        this.trigger('next', next);
        this.model = next;
        this.render();
        var url = this.base_url_path + next.get('slug') + '/' + next.id;
        Backbone.history.navigate(url, true);
      }
      return false;
    },
    
    onKeydown: function(ev) {
      switch (ev.keyCode) {
        case 38:
        case 37:
          this.previous();
          break;
        case 39:
        case 40:
          this.next();
          break;
      }
    },
    
    updateNavLinks: function() {
      var $prev = this.$el.find('.previous'),
          $next = this.$el.find('.next'),
          i     = this.collection.indexOf(this.model);
      if (!this.collection.length) {
        $prev.hide();
        $next.hide();
        return;
      }
      $prev.show();
      $next.show();
      if (i == 0) {
        $prev.css('visibility', 'hidden');
      } else {
        $prev.css('visibility', 'visible');
      }
      if (i == this.collection.length - 1) {
        $next.css('visibility', 'hidden');
      } else {
        $next.css('visibility', 'visible');
      }
    }

  });
});


