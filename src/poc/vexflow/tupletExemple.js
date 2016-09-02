
    VF = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "vexflow_container".
    var div = document.getElementById("vexflow_container")
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(1000, 500);
    var ctx = renderer.getContext();
    ctx.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 800);

    // Add a clef and time signature.
    stave.addClef("percussion").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(ctx).draw();


// Setup the notes_array
var notes = [
  ["c/4", "16"],
  ["d/4", "16"],
  ["e/4", "16"],
  ["f/4", "16"],
  ["g/4", "16"],
  ["a/4", "4"],
  ["b/4", "4"],
  ["c/5", "8"],
  ["b/4", "16"],
  ["a/4", "16"],
  ["g/4", "16"],
  ["f/4", "16"],
  ["e/4", "16"],
  ["d/4", "16"],
  ["c/4", "8"],
  ["b/3", "8"],
  ["c/4", "8"]
].map(function(noteStruct){
  return new Vex.Flow.StaveNote({
    keys: [noteStruct[0]],
    duration: noteStruct[1]
  });
});

// Setup the beams: we do this before defining tuplets so that default bracketing will work.
var beams = [
  [0, 5], // c/4 - g/4
  [8, 13], // b/4 - e/4
  [14, 17] // c/4, b/3, c/4
].map(function(i){
  return new Vex.Flow.Beam(notes.slice(i[0], i[1]));
});

// Now create the tuplets:
var quarterNoteTriplet = new Vex.Flow.Tuplet(notes.slice(0, 8), {
  num_notes: 3, notes_occupied: 2, ratioed: true
});

var nestedQuintuplet = new Vex.Flow.Tuplet(notes.slice(0,5), {
  num_notes: 5, notes_occupied: 4, location: -1, bracketed: true
});

var nestedTriplet = new Vex.Flow.Tuplet(notes.slice(6,8), {
  num_notes: 3, notes_occupied: 2, location: -1
});

var complexQuintuplet = new Vex.Flow.Tuplet(notes.slice(8,13), {
  num_notes: 5, notes_occupied: 3
})

var simpleTriplet = new Vex.Flow.Tuplet(notes.slice(14,17));

// Create the voice:
var voice = new Vex.Flow.Voice({num_beats:4, resolution:Vex.Flow.RESOLUTION})
voice.addTickables(notes);

// Format the voice:
var formatter = new Vex.Flow.Formatter();
formatter.format([voice], 775);

// Draw the voice:
voice.draw(ctx, stave);

// Draw the beams:
beams.forEach(function(beam){
  beam.setContext(ctx).draw();
});

// Draw the tuplets:
[ quarterNoteTriplet, nestedQuintuplet, nestedTriplet, complexQuintuplet, simpleTriplet ]
.forEach(function(tuplet){
  tuplet.setContext(ctx).draw();
});
