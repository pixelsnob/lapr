/**
 * content_blocks view, returns an instance 
 * 
 * 
 */
define([
  'views/base',
  'views/content_block',
  'collections/content_blocks',
  'template'
], function(
  BaseView,
  ContentBlockView,
  ContentBlocksCollection,
  template
) {
  
  var View = BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.collection = new ContentBlocksCollection;
      this.deferred = this.collection.fetch();
    },
    
    // Looks for all .content-block elements and render them
    render: function() {
      var obj = this;
      this.deferred.done(function() {
        var $content_blocks = obj.$el.find('.content-block');
        $content_blocks.each(function() {
          var $el   = $(this),
              name  = $el.attr('data-name'),
              id    = $el.attr('data-id'),
              model;
          if (name) {
            model = obj.collection.findWhere({ name: name });
          } else {
            model = obj.collection.findWhere({ _id: Number(id) });
          }
          var view = new ContentBlockView({ model: model });
          $el.html(view.render().el);
        }); 
      });
      return this;
    }
  });

  return new View;
});

