/**
 * Tags tree category view
 * 
 */
define([
  'views/base',
  './tags_list'
], function(
  BaseView,
  TagsListView
) {
  
  return BaseView.extend({

    tagName: 'li',

    events: {
    },

    initialize: function(opts) {
      this.products = opts.products;
      this.tags = opts.tags;
    },
    
    render: function() {
      var obj = this;
      this.$el.append(this.model.get('name')); 
      var view = new TagsListView({
        collection: this.tags,
        products: this.products
      });
      this.$el.append(view.render().el);
      return this;
    }
  
  });
});
