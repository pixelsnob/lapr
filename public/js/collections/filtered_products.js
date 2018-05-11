/**
 * filtered_products collection
 * 
 */
import ProductModel from '../models/product';
export default Backbone.Collection.extend({

  model: ProductModel,

  per_page: 30,

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
    var aval = a.get('name') + ' ' + a.get('sizes'),
      bval = b.get('name') + ' ' + b.get('sizes');
    var comp = aval.localeCompare(bval);
    return (this.sort_direction == 'asc' ? comp : -comp);
  }

});

