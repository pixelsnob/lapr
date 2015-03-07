/**
 * Tonal range view: uses vexflow to generate music notation of an
 * instrument's range
 * 
 */
define([
  'views/base',
  'template',
  'vexflow'
], function(
  BaseView,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.range = opts.range;
    },
    
    parseRange: function() {
      var notes = [];
      var range = $.trim(this.range);
      if (!range.length) {
        return false;
      }
      var note_groups = range.split(',');
      for (var g in note_groups) {
        var raw_notes = note_groups[g].split('-');
        if (raw_notes.length == 2) {
          for (var r in raw_notes) {
            notes.push(this.parseNote(raw_notes[r], r));
          }
        } else if (raw_notes.length == 1) {
          notes.push(this.parseNote(raw_notes[0]));
        }
      }
      return notes;
    },
    
    parseNote: function(note, range_index) {
      // Capture note value and octave
      var parsed = /^([a-g](#{1,2}|b{1,2})?)([1-8])$/i.exec($.trim(note));
      if (parsed && parsed.length == 4) {
        // Convert Bb3 => Bb/3 for notation library
        var converted_note = parsed[1] + '/' + parsed[3];
        return {
          converted: converted_note,
          octave: parsed[3],
          accidentals: parsed[2],
          clef: (parsed[3] > 3 ? 'treble' : 'bass'),
          range_index: range_index // is this the first or second note in a range?
        };
      }
    },

    createNote: function(key, duration, clef) {
      var note = new Vex.Flow.StaveNote({
        keys: [ key ],
        duration: duration,
        clef: clef
      })
      var key_matches = /^[a-g](#{1,2}|b{1,2})?/i.exec(key);
      if (key_matches && key_matches[1] && key_matches[1].length) {
        note.addAccidental(0, new Vex.Flow.Accidental(key_matches[1]));
      }
      return note;
    },

    createGhostNote: function(duration, clef) {
      var note = new Vex.Flow.GhostNote({
        keys: [ 'D/5' ],
        duration: duration,
        clef: clef,
        glyph: null
      })
      return note;
    },

    createVoice: function() {
      var voice = new Vex.Flow.Voice({
        num_beats: 4,
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION
      });
      voice.setMode(Vex.Flow.Voice.Mode.SOFT);
      return voice;
    },
    
    render: function() {
      var notes = this.parseRange();
      if (!notes.length) {
        return this;
      }
      //console.log(notes);

      var canvas = $('<canvas>');
      this.setElement(canvas);

      canvas = this.$el.get(0);

      canvas.width = 340;
      canvas.height = 210;
      
      var canvas_ctx = canvas.getContext("2d");
      canvas_ctx.fillStyle = '#fff';
      canvas_ctx.strokeStyle = '#fff';
      canvas_ctx.scale(0.6, 0.6);

      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      var start = 7;
      var width = canvas.width;
      
      var treble = new Vex.Flow.Stave(start, 80, width);
      treble.setNoteStartX(20);
      treble.addClef('treble');
      
      var bass = new Vex.Flow.Stave(start, 150, width);
      bass.setNoteStartX(20);
      bass.addClef('bass');

      treble.setContext(ctx).draw();
      bass.setContext(ctx).draw();
      
      var brace = new Vex.Flow.StaveConnector(treble, bass);
      brace.setType(Vex.Flow.StaveConnector.type.BRACKET);
      brace.setContext(ctx).draw();

      var notes_treble = [],
          notes_bass   = [],
          stave_lines  = [];
      var voice_treble = this.createVoice(),
          voice_bass   = this.createVoice();

      var previous_note;
      for (var n in notes) {
        var note;
        if (notes[n].clef == 'treble') {
          notes_treble.push(notes[n].converted);
          note = this.createNote(notes[n].converted, 'w', 'treble');
          voice_treble.addTickable(note);
        } else {
          note = this.createNote(notes[n].converted, 'w', 'bass');
          voice_bass.addTickable(note);
          notes_bass.push(notes[n].converted);
          // Also create a placeholder "ghost note" in the treble clef,
          // to line up the voices without using rests
          var rest = this.createGhostNote('w', 'treble');
          voice_treble.addTickable(rest);
        }
        if (notes[n].range_index == 1 && previous_note) {
          var stave_line = new Vex.Flow.StaveLine({
            first_note:    previous_note,
            last_note:     note,
            first_indices: [0],
            last_indices:  [0]
          });
          stave_lines.push(stave_line);
        }
        previous_note = note;
      }
      
      var voices = [];
      if (notes_treble.length) {
        voices.push(voice_treble);
      }
      if (notes_bass.length) {
        voices.push(voice_bass);
      }
      
      var formatter = new Vex.Flow.Formatter;
      formatter.joinVoices(voices);
      formatter.format(voices, width - 50);
      
      if (notes_bass.length) {
        voice_bass.draw(ctx, bass);
      }

      if (notes_treble.length) {
        voice_treble.draw(ctx, treble);
      }
      
      if (stave_lines.length) {
        for (var s in stave_lines) {
          stave_lines[s].setContext(ctx).draw();
        }
      }
      
      return this;
    }
    
  });
});

