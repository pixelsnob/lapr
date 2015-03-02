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
      var keys_treble = [],
          keys_bass   = [];
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
        var parsed = /^([a-g](?:#{1,2}|b{1,2})?)([1-8])/i.exec(note);
        if (parsed && parsed.length == 3) {
          // Convert Bb3 => Bb/3 for notation library
          var converted_note = parsed[1] + '/' + parsed[2];
          if (parsed[2] > 3) {
            keys_treble.push(converted_note);
          } else {
            keys_bass.push(converted_note);
          }
        }
      }
      return { keys_treble: keys_treble, keys_bass: keys_bass };
    },

    render: function() {
      var range = this.parseRange();
      if (!range) {
        return this;
      }

      var canvas = $('<canvas>');
      this.setElement(canvas);

      canvas = this.$el.get(0);

      canvas.width = 260;
      canvas.height = 210;
      
      var canvas_ctx = canvas.getContext("2d");
      canvas_ctx.fillStyle = '#fff';
      canvas_ctx.strokeStyle = '#fff';
      canvas_ctx.scale(0.7, 0.7);

      var renderer = new Vex.Flow.Renderer(canvas,
        Vex.Flow.Renderer.Backends.CANVAS);
      var ctx = renderer.getContext();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      var start = 7;
      var width = 250;
      
      var treble = new Vex.Flow.Stave(start, 80, width);
      treble.addClef("treble");
      
      var bass = new Vex.Flow.Stave(start, 150, width);
      bass.addClef("bass");

      treble.setContext(ctx).draw();
      bass.setContext(ctx).draw();
      
      var brace = new Vex.Flow.StaveConnector(treble, bass);
      brace.setType(Vex.Flow.StaveConnector.type.BRACKET);
      brace.setContext(ctx).draw();
      

      if (range.keys_treble.length) {
        var notes_treble = this.createNotes(range.keys_treble, 'w', 'treble'),
            voice_treble = this.createVoice().addTickables(notes_treble);
      }
      if (range.keys_bass.length) {
        var notes_bass = this.createNotes(range.keys_bass, 'w', 'bass'),
            voice_bass = this.createVoice().addTickables(notes_bass);
      }

      var voices = [];
      if (voice_bass) {
        voices.push(voice_bass);
      }
      if (voice_treble) {
        voices.push(voice_treble);
      }
      
      var formatter = new Vex.Flow.Formatter();
      formatter.format(voices);

      if (voice_treble) {
        voice_treble.draw(ctx, treble);
      }
      if (voice_bass) {
        voice_bass.draw(ctx, bass);
      }
      return this;
    },

    createNotes: function(keys, duration, clef) {
      var note = new Vex.Flow.StaveNote({
        keys: keys,
        duration: duration,
        clef: clef
      })
      // Create an array of accidentals for this note
      var accidentals = [];
      for (var i = 0; i < keys.length; i++) {
        var key_matches = /^[a-g](#{1,2}|b{1,2})?/i.exec(keys[i]);
        if (key_matches && key_matches[1] && key_matches[1].length) {
          note.addAccidental(i, new Vex.Flow.Accidental(key_matches[1]));
        }
      }
      return [ note ];
    },

    createVoice: function() {
      return new Vex.Flow.Voice({
        num_beats: 4,
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION
      });
    }
    
  });
});

