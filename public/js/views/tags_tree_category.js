/**
 * Tags tree category view
 * 
 */
define([
  'views/base',
  'views/tags_tree_list'
], function(
  BaseView,
  TagsTreeListView
) {
  
  return BaseView.extend({

    tagName: 'li',

    events: {
      //'click .clear-category': 'clearCategory'
    },

    initialize: function(opts) {
      this.products = opts.products;
      this.tags = opts.tags;
    },
    
    render: function() {
      var obj = this;
      this.$el.append(this.model.get('name')); 
      //this.$el.append($('<a>').attr('href', 'javascript:void(0);').addClass('clear-category').text('x'));
      var view = new TagsTreeListView({
        collection: this.tags,
        products: this.products
      });
      this.$el.append(view.render().el);
      return this;
    },

    clearCategory: function() {
      console.log('?');
    }
  
  });
});
