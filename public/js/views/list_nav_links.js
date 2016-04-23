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
      this.setElement(template.render('partials/list_nav_links', { label: opts.label })); 
    },

    render: function() { 
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
        Backbone.history.navigate(url, false);
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
        Backbone.history.navigate(url, false);
      }
      return false;
    },
    
    onKeydown: function(ev) {
      //if (this.hide_nav) {
      //  return;
      //}
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
    }/*,
    
    // Toggles previous/next links
    updateNavLinks: function() {
      var $prev = this.$el.find('.previous'),
          $next = this.$el.find('.next');
      if (this.hide_nav) {
        $prev.css('visibility', 'hidden');
        $next.css('visibility', 'hidden');
        return;
      }
      var products = this.model.collection.refs.filtered_products,
          i        = products.indexOf(this.model);
      if (i == 0 || !products.length) {
        $prev.css('visibility', 'hidden');
      } else {
        $prev.css('visibility', 'visible');
      }
      if (i == products.length - 1 || !products.length) {
        $next.css('visibility', 'hidden');
      } else {
        $next.css('visibility', 'visible');
      }
    }*/

  });
});


