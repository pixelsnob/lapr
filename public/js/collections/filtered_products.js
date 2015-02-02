/**
 * filtered_products collection
 * 
 */
define([
  '../models/product'
], function(ProductModel) {
  return Backbone.Collection.extend({
    
    url: '/products',

    model: ProductModel,

    comparator: 'name',

    per_page: 9,

    current_page: 1,

    getPaged: function() {
      return this.slice(this.getStartIndex(), this.getEndIndex());
    },
    
    getStartIndex: function() {
      var end = this.getEndIndex();
      return (end - this.per_page >= 0 ? end - this.per_page : 0);
    },

    getEndIndex: function() {
      return this.current_page * this.per_page;
    },

    setPage: function(page) {
      this.current_page = page;
    },
    
    next: function() {
      this.current_page++;
    },

    hasMore: function() {
      return this.current_page * this.per_page < this.length;
    }
    
  });
});

