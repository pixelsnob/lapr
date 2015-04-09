/**
 * content_block view
 * 
 */
define([
  'views/base',
  'models/content_block',
  'views/content_block',
  'lib/markdown',
  'template'
], function(
  BaseView,
  ContentBlockModel,
  ContentBlockView,
  markdown,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },
    
    initialize: function(opts) {
      this.model = new ContentBlockModel;
      var name = this.$el.attr('data-name');
      this.deferred = this.model.fetch({
        url: '/api/content-blocks/name/' + name
      });
      // Content block editor if logged in
      if (window.lapr.user) {
        var obj = this;
        require([ 'views/admin/content_block' ],
        function(ContentBlockAdminView) {
          var events = {
            'click .edit-content-block':   _.bind(obj.edit, obj, ContentBlockAdminView),
            'click .save-content-block':   'save',
            'click .revert-content-block': 'revert'
          };
          obj.delegateEvents(_.extend(obj.events, events));
        });
      }
      this.listenTo(this.model, 'change', this.render);
    },
    
    render: function() {
      var obj = this;
      this.deferred.done(function() {
        var content = obj.model.get('content');
        if (obj.model.get('type') == 'markdown') {
          content = markdown(content);
        }
        obj.$el.find('.content').hide().html(content).fadeIn(500);
      });
      return this;
    },

    edit: function(ContentBlockAdminView) {
      var obj = this;
      this.deferred.done(function() {
        var view = new ContentBlockAdminView({ model: obj.model });
        view.renderModal();
        view.listenTo(view, 'save', function() {
          if (obj.model.hasChanged()) {
            obj.showEditLinks();
          }
        });
      });
    },

    save: function() {
      var obj = this;
      this.model.save(this.model.attributes).done(function() {
        obj.hideEditLinks();
      }).fail(obj.showServerError);
    },

    revert: function() {
      var obj = this;
      this.deferred = this.model.fetch().done(function() {
        obj.hideEditLinks();
        obj.render();
      }).fail(obj.showServerError);
    },

    showEditLinks: function() {
      this.$el.find('.edit-links .save, .edit-links .revert')
        .removeClass('hide');
    },

    hideEditLinks: function() {
      this.$el.find('.edit-links .save, .edit-links .revert')
        .addClass('hide');
    }

  });
});

