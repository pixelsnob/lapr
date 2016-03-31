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
      var content = this.model.get('content');
      if (this.model.get('type') == 'markdown') {
        content = markdown(content);
      }
      this.$el.html(template.render('partials/content_block'));
      var $content = this.$el.find('.content');
      $content.html(content);
      return this;
    },

    edit: function(ContentBlockAdminView) {
      var view = new ContentBlockAdminView({ model: this.model });
      view.renderModal();
      this.listenTo(view, 'save', function() {
        if (this.model.hasChanged()) {
          this.showEditLinks();
        }
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

