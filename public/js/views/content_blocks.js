/**
 * content_blocks view
 * 
 */
define([
  'views/base',
  'models/content_block',
  'template'
], function(
  BaseView,
  ContentBlockModel,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.model = new ContentBlockModel;
      this.deferred = this.model.fetch({ name: opts.name });
    },
    
    render: function() {
      var obj = this;
      this.deferred.done(_.bind(this.renderContentBlock, this));
      return this;
    },

    renderContentBlock: function() {
      this.setElement(template.render('partials/content_block', {
        outputContentBlock: function() {},
        content_blocks: [],
        content: null 
      }));
    }

  });
});

