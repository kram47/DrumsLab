/**
 *
 * @file
 *     Score.js
 * @description
 *     Manage the drawing of partitions staves
 * @author
 *     marc charton
 *
 */

var Score = (function(VF) {

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

        // Module Configuration
        var config = {
            container : {
                name : 'vexflow_container',
                width : 1000,
                height : 500
            }
        };

        // Module name
        var _name = "Score";

        // Module Method Exposition
        var partition = {
            config : config,
            init : init
        };


    // -- -- P R I V A T E   P R O P E R T I E S -- --

    // Context Vexlow
    var _context;

    // Stave Vexlow
    var _stave;


    // -- -- P R I V A T E -- --

        /*
            Log d'un message avec le nom du module
         */
        function log (message) {
            console.log("["+_name+"] " + message);
        };


        ////// C O N T A I N E R
        function initContainer() {

            // Create an SVG renderer and attach it to the DIV element named "vexflow_container".
            var div = document.getElementById(config.container.name)
            var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

            // Configure the rendering context.
            renderer.resize(config.container.width, config.container.height);
            _context = renderer.getContext();
            _context.setFont("Arial", 10, "").setBackgroundFillStyle("#fac");
        }

        ////// S T A V E
        function initStave() {

            // Create a stave of width 800 at position 10, 40 on the canvas.
            _stave = new VF.Stave(10, 40, 800);

            // Add a clef and time signature.
            _stave.addClef("percussion").addTimeSignature("4/4");

            // Connect it to the rendering context and draw!
            _stave.setContext(_context).draw();
        }


        function addNotes() {

            ////// N O T E S

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


            ////// B E A M S

                // Setup the beams: we do this before defining tuplets so that default bracketing will work.
                var beams = [
                  [0, 5],
                  [6,12],
                  [12, 15]
                ].map(function(i){
                  return new Vex.Flow.Beam(notes.slice(i[0], i[1]));
                });


            ////// T U P L E T S

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


            ////// V O I C E

                // Create the voice:
                var voice = new Vex.Flow.Voice({num_beats:4, resolution:Vex.Flow.RESOLUTION})
                voice.addTickables(notes);

                // Format the voice:
                var formatter = new Vex.Flow.Formatter();
                formatter.format([voice], 775);


            ////// D R A W


                // Draw the voice:
                voice.draw(_context, _stave);

                // Draw the beams:
                beams.forEach(function(beam){
                  beam.setContext(_context).draw();
                });

                // Draw the tuplets:
                [  simpleQuintuplet, simpleTriplet , simpleSextuplet ]
                .forEach(function(tuplet){
                  tuplet.setContext(_context).draw();
                });


        }


    // -- -- P U B L I C   M E T H O D S -- --

        /*
            Initialisation du module
         */
        function init () {
            log("Initialisation");
            initContainer();
            initStave();
            addNotes();
        };

    return partition;

})(Vex.Flow);
