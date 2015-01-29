/**
 * Categories nav list item
 * 
 */
define([
  'views/base'
], function(
  BaseView
) {
  
  return BaseView.extend({

    tagName: 'li',

    events: {
      'click a': 'toggle'
    },

    initialize: function(opts) {
      this.products = opts.products;
      this.listenTo(this.products.refs.selected_categories, 'add', this.selectIfCurrent);
      this.listenTo(this.products.refs.selected_categories, 'reset', this.setSelected);
      //this.listenTo(this.products.refs.selected_categories, 'unbind', this.remove);
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
        console.log('sel');
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
      return false;
    },
    
    select: function() {
      this.$el.find('a').css({ fontWeight: 'bold' }); 
    },
    
    deselect: function() {
      this.$el.find('a').css({ fontWeight: 'normal' }); 
    },

    render: function() {
      var a = $('<a>').text(this.model.get('name'))
        .attr('href', '/instruments/categories/'  + this.model.get('slug'));
      this.$el.append(a);
      return this;
    }

  });
});
