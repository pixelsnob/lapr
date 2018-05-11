/**
 * Site overlay view
 * 
 */
import BaseView from 'views/base';
import template from 'template';

export default BaseView.extend({

  el: 'body',

  events: {},

  initialize: function(opts) {},

  render: function() {
    this.$el.append(template.render('partials/overlay'));
    this.$overlay = this.$el.find('.overlay');
    return this;
  },

  show: function($content) {
    this.$overlay.html($content);
    this.$overlay.fadeIn();
    this.trigger('shown');
  },

  hide: function() {
    this.$overlay.fadeOut();
    this.$overlay.remove();
    this.trigger('hidden');
  },

  onClose: function() {}

});

