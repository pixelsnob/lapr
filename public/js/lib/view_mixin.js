
/** 
 * View mixin
 * 
 */
define([ 'backbone' ], function(Backbone) {
  Backbone.View.mixin = function(mixin) {
    var initialize = this.prototype.initialize;
    _.extend(this.prototype, _.omit(mixin, 'events'));
    this.prototype.events = this.prototype.events || {};
    _.extend(this.prototype.events, mixin.events);
    if (typeof mixin.initialize == 'function') {
      this.prototype.initialize = function () {
        mixin.initialize.apply(this);
        initialize.apply(this);
      };
    }
    return this;
  };
});

