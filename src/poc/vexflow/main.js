
    VF = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "vexflow_container".
    var div = document.getElementById("vexflow_container")
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("percussion").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();


    var notes = [
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8r" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "16" })
    ];

    var notes2 = [
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8" }),
      new VF.StaveNote({ keys: ["c/5"], duration: "8" })
    ];



    var beams = VF.Beam.generateBeams(notes, {
        stem_direction: 1
    });

    // Now create the tuplets:
    var triplet = new Vex.Flow.Tuplet(notes2, {
      num_notes: 3, notes_occupied: 2
    });
    Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(function(b) {b.setContext(context).draw()})

    triplet.setContext(ctx).draw();

    var ties = [
      new VF.StaveTie({
        first_note: notes2[1],
        last_note: notes3[0],
        first_indices: [0],
        last_indices: [0]
      })
    ];
    ties.forEach(function(t) {t.setContext(context).draw()})

