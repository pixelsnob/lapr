
import React from 'react';
import Vex from 'vexflow';
import _ from 'lodash';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.draw();
  }

	parseRange() {
		var notes = [];
		var range = this.props.range.trim();
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
	}
	
	parseNote(note, range_index) {
		// Capture note value and octave
		var parsed = /^([a-g](#{1,2}|b{1,2})?)([1-8])$/i.exec(note.trim());
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
	}

	createNote(key, duration, clef) {
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
	}

	createGhostNote(duration, clef) {
		var note = new Vex.Flow.GhostNote({
			keys: [ 'D/5' ],
			duration: duration,
			clef: clef,
			glyph: null
		})
		return note;
	}

	createVoice() {
		var voice = new Vex.Flow.Voice({
			num_beats: 4,
			beat_value: 4,
			resolution: Vex.Flow.RESOLUTION
		});
		voice.setMode(Vex.Flow.Voice.Mode.SOFT);
		return voice;
	}
	
  getNoteOctaves() {
    return this.parseRange().map(note => node.octave);
  }

	getMinOctave() {
    return Math.min(...this.getNoteOctaves());
	}

	getMaxOctave() {
    var octaves = this.parseRange().map(note => note.octave);
    return Math.max(...this.getNoteOctaves());
	}
  
  render() {
    return (
      <canvas ref={(ref) => this.canvas = ref} id="product-range-canvas"/>
    );
  }
  
	draw() {
		var notes = this.parseRange();
		if (!notes.length) {
      return (<div/>);
		}
    
    var octaves = notes.map(note => note.octave);
		var min_octave = Math.min(...octaves),
				max_octave = Math.max(...octaves);

		// Make adjustments to stave length and height based on note values
		var canvas_width = (260 + (notes.length * 20));
		var canvas_height = 100;

		canvas_height += (max_octave >= 7 ? 30 : 0);
		canvas_height += (min_octave < 2 ? 20 : 0);

		var canvas_ctx = this.canvas.getContext('2d');

		canvas_ctx.fillStyle = '#fff';
		canvas_ctx.strokeStyle = '#fff';
		canvas_ctx.scale(0.5, 0.5);
		
    
    var renderer = new Vex.Flow.Renderer(this.canvas,
      Vex.Flow.Renderer.Backends.CANVAS);

		var ctx = renderer.getContext();
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		var start = 7;
		var width = this.canvas.width;
		
		var treble = new Vex.Flow.Stave(
			start,
			(max_octave >= 7 ? 80 : 10),
			width
		);
		treble.setNoteStartX(20);
		treble.addClef('treble');
		
		var bass = new Vex.Flow.Stave(
			start,
			(max_octave >= 7 ? 150 : 80),
			width
		);
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
			// Create lines between two notes to represent ranges
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
		
	}

}


