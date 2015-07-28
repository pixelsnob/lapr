/**
 * Categories nav list item
 * 
 */
define([
  'views/base',
  'lib/events'
], function(
  BaseView,
  global_events
) {
  
  return BaseView.extend({

    tagName: 'li',

    events: {
      'click a': 'toggle'
    },

    initialize: function(opts) {
      this.products = opts.products;
      var refs = this.products.refs;
      this.listenTo(refs.selected_categories, 'add', this.selectIfCurrent);
      this.listenTo(refs.selected_categories, 'reset', this.setSelected);
      this.listenTo(this.products, 'kill', this.remove);
    },
    
    setSelected: function(collection) {
      if (collection.models.length && collection.models[0].id == this.model.id) {
        this.select();
      } else {
        this.deselect();
      }
    },

    selectIfCurrent: function(model) {
      if (model.id == this.model.id) {
        this.select();
      }
    },

    deselectIfCurrent: function(model) {
      if (model.id == this.model.id) {
        this.deselect();
      }
    },
    
    toggle: function(ev) {
      this.products.refs.selected_categories.reset(this.model);
      var url = '/instruments/categories/' + this.model.get('slug');
      Backbone.history.navigate(url, true);
      global_events.trigger('categories-nav-select');
      return false;
    },
    
    select: function() {
      this.$el.find('a').addClass('selected'); 
    },
    
    deselect: function() {
      this.$el.find('a').removeClass('selected'); 
    },

    render: function() {
      var a = $('<a>').text(this.model.get('name'))
        .attr('href', '/instruments/categories/'  + this.model.get('slug'));
      this.$el.append(a);
      return this;
    }

  });
});
