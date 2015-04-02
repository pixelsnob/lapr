/**
 * filtered_products collection
 * 
 */
define([
  '../models/product'
], function(ProductModel) {
  return Backbone.Collection.extend({
    
    model: ProductModel,

    comparator: 'name',

    per_page: 60,

    current_page: 1,
    
    sort_direction: 'asc',
    
    getPaged: function() {
      return this.slice(this.getStartIndex(), this.getEndIndex());
    },
    
    getStartIndex: function() {
      return (this.current_page * this.per_page) - this.per_page;
    },

    getEndIndex: function() {
      var end = this.current_page * this.per_page;
      return (end > this.length ? this.length : end);
    },

    setPage: function(page) {
      this.current_page = page;
    },
    
    next: function() {
      this.current_page++;
    },

    hasMore: function() {
      return this.current_page * this.per_page < this.length;
    },

    comparator: function(a, b) {
      var comp = a.get('name').localeCompare(b.get('name'));
      return (this.sort_direction == 'asc' ? comp : -comp);
    }
    
  });
});

