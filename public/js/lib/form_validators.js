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
     *   A3, B3, C#5
     *   Bb1-C#5, Eb5, F6
     */
    musicNotation: function(options) {
      var validateNote = function(note) {
        return (note.match(/^([a-g](?:#{1,2}|b{1,2})?)([1-8])$/i) !== null);
      };
      return function(value) {
        if (!value.trim().length) {
          return;
        }
        var err = {
          message: 'Invalid range'
        };
        // Make an array of note groups: can be A3 or A3-C5, etc.
        var note_groups = value.replace(/\s/g, '').split(',');
        for (var g in note_groups) {
          var raw_notes = note_groups[g].split('-');
          if (raw_notes.length == 2) {
            // This is a range of notes, A3-C5: validate each one
            for (var r in raw_notes) {
              if (!validateNote(raw_notes[r])) {
                return err;
              }
            }
          } else if (raw_notes.length == 1) {
            // This is a single note: validate it
            if (!validateNote(raw_notes[0])) {
              return err;
            }
          } else {
            // Invalid
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
