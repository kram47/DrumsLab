
    VF = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "vexflow_container".
    var div = document.getElementById("vexflow_container")
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(1000, 500);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 800);

    // Add a clef and time signature.
    stave.addClef("percussion").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Setup the notes_array
    var notes = [];

    [
        ["c/5", "16"],
        ["c/5", "16"],
        ["c/5", "16"],
        ["c/5", "16"],
        ["c/5", "16"],
    ].forEach(addNote);

    [
        ["c/5", "4"],
    ].forEach(addNote);

    [
        ["c/5", "16"],
        ["c/5", "16"],
        ["c/5", "16"],
        ["c/5", "16"],
        ["c/5", "16"],
        ["c/5", "16"],
    ].forEach(addNote);

    [
        ["c/5", "8"],
        ["c/5", "8"],
        ["c/5", "8"]
    ].forEach(addNote);

    function addNote(noteStruct){
      notes.push(
        new Vex.Flow.StaveNote({
            keys: [noteStruct[0]],
            duration: noteStruct[1]
        })
      );
    }

    // Setup the beams: we do this before defining tuplets so that default bracketing will work.
    var beams = [
      [0, 5],
      [6,12],
      [12, 15]
    ].map(function(i){
      return new Vex.Flow.Beam(notes.slice(i[0], i[1]));
    });

    // Create the quintuplet
    var simpleQuintuplet = new Vex.Flow.Tuplet(notes.slice(0,5), {
      num_notes: 5, notes_occupied: 4, ratioed: false,
    });

    // Create the sextuplet
    var simpleSextuplet = new Vex.Flow.Tuplet(notes.slice(6,12), {
      num_notes: 6, notes_occupied: 4, ratioed: false,
    });

    // Create the triplet
    var simpleTriplet = new Vex.Flow.Tuplet(notes.slice(12,15));

    // Create the voice:
    var voice = new Vex.Flow.Voice({num_beats:4, resolution:Vex.Flow.RESOLUTION})
    voice.addTickables(notes);

    // Format the voice:
    var formatter = new Vex.Flow.Formatter();
    formatter.format([voice], 775);

    // Draw the voice:
    voice.draw(context, stave);

    // Draw the beams:
    beams.forEach(function(beam){
      beam.setContext(context).draw();
    });

    // Draw the tuplets:
    [  simpleQuintuplet, simpleTriplet , simpleSextuplet ]
    .forEach(function(tuplet){
      tuplet.setContext(context).draw();
    });

