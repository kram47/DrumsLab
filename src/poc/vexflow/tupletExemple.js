
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
    var notes = [
      ["c/5", "16"],
      ["c/5", "16"],
      ["c/5", "16"],
      ["c/5", "16"],
      ["c/5", "4"],
      ["c/5", "16"],
      ["c/5", "16"],
      ["c/5", "16"],
      ["c/5", "16"],
      ["c/5", "8"],
      ["c/5", "8"],
      ["c/5", "8"]
    ].map(function(noteStruct){
      return new Vex.Flow.StaveNote({
        keys: [noteStruct[0]],
        duration: noteStruct[1]
      });
    });

    // Setup the beams: we do this before defining tuplets so that default bracketing will work.
    var beams = [
      [0, 4],
      [5, 9],
      [9, 12]
    ].map(function(i){
      return new Vex.Flow.Beam(notes.slice(i[0], i[1]));
    });

    var simpleTriplet = new Vex.Flow.Tuplet(notes.slice(9,12));

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
    [  simpleTriplet ]
    .forEach(function(tuplet){
      tuplet.setContext(context).draw();
    });

