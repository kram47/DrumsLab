
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
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "4" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
    ];

    // Setup the beams: we do this before defining tuplets so that default bracketing will work.
    var beams = [
      new Vex.Flow.Beam(notes.slice(0, 4)),
      new Vex.Flow.Beam(notes.slice(5, 10)),
      new Vex.Flow.Beam(notes.slice(11, 14))
    ];

    var complexQuintuplet = new Vex.Flow.Tuplet(notes.slice(5,10), {
      num_notes: 5, notes_occupied: 3
    })

    var simpleTriplet = new Vex.Flow.Tuplet(notes.slice(11,14));

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
    [ complexQuintuplet, simpleTriplet ]
    .forEach(function(tuplet){
      tuplet.setContext(context).draw();
    });
