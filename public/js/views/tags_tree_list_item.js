/**
 * Tags tree item view
 * 
 */
define([
  'views/base',
  'lib/events'
], function(
  BaseView,
  vent
) {
  
  return BaseView.extend({

    tagName: 'li',

    events: {
      'click a': 'toggle'
    },

    initialize: function(opts) {
      this.selected_tags = opts.selected_tags; 
      // This needs to happen in each list item view, so that this view
      // can disable itself based on cascading search
      var obj = this;
      this.listenTo(this.selected_tags, 'add', function(model) {
        if (model.id == obj.model.id) {
          obj.select();
          console.log(obj.selected_tags);
        }
      });
      this.listenTo(this.selected_tags, 'remove', function(model) {
        if (model.id == obj.model.id) {
          obj.deselect();
          console.log(obj.selected_tags);
        }
      });
      // ...listen to a filtered products collection??????
    },
    
    toggle: function(ev) {
      if (this.selected_tags.findWhere({ _id: this.model.id })) {
        this.selected_tags.remove(this.model);
      } else {
        this.selected_tags.add(this.model);
      }
      //Backbone.history.navigate($(ev.currentTarget).attr('href'), true);
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
        .attr('href', '/products/tags/'  + this.model.get('slug'));
      this.$el.append(a);
      return this;
    }

  });
});
