/**
 * Extends Backbone.Form.validators
 * 
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(
  Backbone
) {
  _.extend(Backbone.Form.validators, {
    
    number: function(options) {
      options = _.extend({
        type: 'number',
        message: 'Must be a number',
        regexp: /^[0-9]*\.?[0-9]*?$/
      }, options);
      return Backbone.Form.validators.regexp(options);
    },
    
    /**
     * Array version of "required"
     * 
     */
    requiredArray: function(options) {
      return function(value) {
        if (!_.isArray(value) || !value.length) {
          return { message: 'Must select at least one' }; 
        }
      };
    },

    /**
     * Validates a list of notes in scientific music notation
     * Valid examples:
     *   A3
     *   Bb1-C#5, Eb5, F6
     */
    musicNotation: function(options) {
      return function(value) {
        var err = {
          //type: 'range',
          message: 'Invalid range'
        };
        var range = $.trim(value);
        if (!range.length) {
          return;
        }
        range = range.replace('-', ',').split(',');
        for (var r in range) {
          // Trim any whitespace around note, i.e. C4-C5, D7
          var note = $.trim(range[r]);
          if (note.match(/^([a-g](?:#{1,2}|b{1,2})?)([1-8])$/i) === null) {
            return err;
          }
        }
      };
    },
    
    /**
     * Checks to see that a field is not duplicated in the same collection
     * 
     */
    unique: function(options) {
      console.log('uq');
      return function(value) {
        if (!options.collection || !options.name) {
          return { message: 'Configuration error' };
        }
        var others = options.collection.filter(function(model) {
          return model.id != options.model.id &&
                 model.get(options.name) == $.trim(value);
        });
        if (others.length) {
          return { message: 'Item already exists' };
        }
      };
    }

  });
});
