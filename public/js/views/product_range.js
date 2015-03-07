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
      // We don't care about ranges when feeding this to the notation library,
      // just individual notes, so replace '-' with ','
      range = range.replace('-', ',').split(',');
      for (var r in range) {
        // Trim any whitespace around note, i.e. C4-C5, D7
        var note = $.trim(range[r]);
        // Capture note value and octave
        var parsed = /^([a-g](#{1,2}|b{1,2})?)([1-8])$/i.exec(note);
        if (parsed && parsed.length == 4) {
          // Convert Bb3 => Bb/3 for notation library
          var converted_note = parsed[1] + '/' + parsed[3];
          notes.push({
            converted: converted_note,
            octave: parsed[3],
            accidentals: parsed[2],
            clef: (parsed[3] > 3 ? 'treble' : 'bass')
          });
        }
      }
      return notes;
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
      if (!notes) {
        return this;
      }
      console.log(notes);

      var canvas = $('<canvas>');
      this.setElement(canvas);

      canvas = this.$el.get(0);

      canvas.width = 340;
      canvas.height = 210;
      
      var canvas_ctx = canvas.getContext("2d");
      canvas_ctx.fillStyle = '#fff';
      canvas_ctx.strokeStyle = '#fff';
      canvas_ctx.scale(0.65, 0.65);

      var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      var start = 7;
      var width = canvas.width - 10;
      
      var treble = new Vex.Flow.Stave(start, 80, width);
      treble.setNoteStartX(30);
      treble.addClef('treble');
      
      var bass = new Vex.Flow.Stave(start, 150, width);
      bass.setNoteStartX(30);
      bass.addClef('bass');

      treble.setContext(ctx).draw();
      bass.setContext(ctx).draw();
      
      var brace = new Vex.Flow.StaveConnector(treble, bass);
      brace.setType(Vex.Flow.StaveConnector.type.BRACKET);
      brace.setContext(ctx).draw();

      var notes_treble = [],
          notes_bass   = [];
      var voice_treble = this.createVoice(),
          voice_bass   = this.createVoice();

      for (var n in notes) {
        if (notes[n].clef == 'treble') {
          notes_treble.push(notes[n].converted);
          var treble_note = this.createNote(notes[n].converted, 'w', 'treble');
          voice_treble.addTickable(treble_note);
        } else {
          var bass_note = this.createNote(notes[n].converted, 'w', 'bass');
          voice_bass.addTickable(bass_note);
          notes_bass.push(notes[n].converted);
          var rest = this.createGhostNote('wr', 'treble');
          voice_treble.addTickable(rest);
        }
      }
      
      var voices = [];
      if (notes_treble.length) {
        voices.push(voice_treble);
      }
      if (notes_bass.length) {
        voices.push(voice_bass);
      }
      
      var formatter = new Vex.Flow.Formatter;
      //formatter.joinVoices(voices);
      formatter.format(voices, width - 40);
      
      if (notes_bass.length) {
        voice_bass.draw(ctx, bass);
      }

      if (notes_treble.length) {
        voice_treble.draw(ctx, treble);
      }

      return this;
    }
    
  });
});

