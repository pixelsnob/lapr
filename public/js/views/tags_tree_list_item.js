/**
 * Tags tree item view
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
      var obj = this, refs = this.products.refs;
      // Select or deselect if this model exists in selected_tags
      this.listenTo(refs.selected_tags, 'add', this.selectIfCurrent);
      this.listenTo(refs.selected_tags, 'remove', this.deselectIfCurrent);
      // Select/deselect on reset, just not the first time
      this.listenToOnce(refs.selected_tags, 'reset', function() {
        obj.listenTo(refs.selected_tags, 'reset', obj.toggleSelected);
      });
      // Enable/disable depending on whether any filtered_products contain
      // the current tag
      this.listenTo(refs.filtered_products.fullCollection, 'reset', this.toggleDisabled); 
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

    toggleSelected: function(selected_tags) {
      var obj = this,
          selected_tag_ids = selected_tags.pluck('_id');
      if (!selected_tag_ids.length) {
        return this.deselect();
      }
      this.products.refs.tags.forEach(function(tag) {
        if (_.contains(selected_tag_ids, tag.get('_id'))) {
          obj.select();
        } else {
          obj.deselect();
        }
      });
    },

    toggleDisabled: function(products) {
      var obj = this;
      products = products.filter(function(product) {
        return _.contains(product.get('tags'), obj.model.id);
      });
      if (products.length) {
        this.enable();
      } else {
        this.disable();
      }
      // determine if this is the only active tag in its group?
    },

    toggle: function(ev) {
      if ($(ev.currentTarget).parent().hasClass('disabled')) {
        return false;
      }
      var tag = this.products.refs.selected_tags.findWhere({ _id: this.model.id });
      if (tag) {
        this.products.refs.selected_tags.remove(tag);
      } else {
        this.products.refs.selected_tags.add(this.model);
      }
      var slugs = this.products.refs.selected_tags.pluck('slug'),
          url   = '/instruments/tags';
      if (slugs.length) {
        url += '/' + slugs.join(',');
      }
      Backbone.history.navigate(url, true);
      return false;
    },
    
    select: function() {
      this.$el.addClass('selected');
    },
    
    deselect: function() {
      this.$el.removeClass('selected'); 
    },

    enable: function() {
      this.$el.removeClass('disabled');
    },
    
    disable: function() {
      this.$el.addClass('disabled');
    },

    render: function() {
      var a = $('<a>').text(this.model.get('name'))
        .attr('href', '/instruments/tags/'  + this.model.get('slug'));
      this.$el.append(a);
      return this;
    }

  });
});
