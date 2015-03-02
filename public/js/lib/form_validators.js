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
     * Validates a list of notes in scientific music notation
     * Valid examples:
     *   A3
     *   Bb1-C#5, Eb5, F6
     */
    musicNotation: function(options) {
      return function(value) {
        var err = {
          type: 'range',
          message: 'Invalid range'
        };
        var range = $.trim(value);
        if (!range.length) {
          return true;
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
    }

  });
});
