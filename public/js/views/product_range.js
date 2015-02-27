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
      var canvas = $('<canvas>');
      this.setElement(canvas);
    },
    
    parseRange: function() {
      var keys_treble = [],
          keys_bass   = [];
      // Convert from one notation scheme to another and
      // split into array:
      // A3-C#6 becomes [ 'A/3', 'C#/6' ]
      var range = this.range.replace(',', '-')
        .split('-')
        .map(function(r) { return $.trim(r); })
        .map(function(r) {
          var parsed = /^([a-g](?:#{1,2}|b{1,2})?)([1-8])/i.exec(r);
          if (parsed && parsed.length == 3) {
            return parsed[1] + '/' + parsed[2];
          }
        });
      // Split notes into two arrays, one for each clef
      for (var r in range) {
        var r_split = range[r].split('/');
        if (r_split.length == 2) {
          if (r_split[1] > 3) {
            keys_treble.push(range[r]);
          } else {
            keys_bass.push(range[r]);
          }
        }
      }
      return { keys_treble: keys_treble, keys_bass: keys_bass };
    },

    render: function() {

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
      
      var range = this.parseRange();

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

