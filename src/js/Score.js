/**
 *
 * @file
 *     ScoreManager.js
 * @description
 *     Manage the drawing of partitions staves
 * @author
 *     marc charton
 *
 */

var ScoreManager = (function(VF) {

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

        // Module Configuration
        var config = {
            container : {
                name : 'vexflow_container',
                width : 1000,
                height : 1200
            }
        };

        // Module name
        var _name = "ScoreManager"; 

        // Module Method Exposition
        var scoreManager = {
            config : config,
            init : init,
            initVoice : initVoice,
        };

    // -- -- P R I V A T E   P R O P E R T I E S -- --

    // Context Vexlow
    var _context;

    // Stave Vexlow
    var _stave;


    // -- -- P U B L I C   M E T H O D S -- --

        /*
            Initialisation du module
         */
        function init () {
            log("Initialisation");
            initContainer();
            // initStave(10, 40);
            // example();
        };



        function initVoice(notes, x, y) {
            initStave(x, y);
            createScoreFromNotes(notes);
        }

        function createScoreFromNotes(notes) {
            // Parameter : [[Note, Note, Note, Note], [Note, Note, Note, Note], [Note, Note, Note, Note], [Note, Note, Note, Note]]
            // Result : Drawn Score (voice)

            var vexNotes = [];
            var beams = [];
            var tuplets = [];

            notes.forEach(function(beatNotes){

                var vexNotesSize = vexNotes.length;
                var beatNotesSize = beatNotes.length;
                var newBeatStartIndex = vexNotesSize;
                var newBeatEndIndex = vexNotesSize + beatNotesSize;

                ////// N O T E S
                vexNotes = _.concat(vexNotes, createVexNotes(beatNotes));

                ////// B E A M S
                if (beatNotesSize >= 2) {
                    beams.push(addBeam(vexNotes, newBeatStartIndex, newBeatEndIndex));  // [---- ----] + [----]
                }
                
/*              ////// T U P L E T S
                var shouldBeNotesNumber;
                if (beatNotesSize == 3) {
                    shouldBeNotesNumber = 2;
                }
                else if (beatNotesSize == 6) {
                    shouldBeNotesNumber = 4;
                }
                
                if (typeof(shouldBeNotesNumber) != "undefined") {
                    tuplets.push(createTuplet(vexNotes, newBeatStartIndex, newBeatEndIndex, beatNotesSize, shouldBeNotesNumber));
                }*/

            });

            ////// V O I C E
            var voice = createVoice(vexNotes);

            ////// D R A W
            draw(voice, beams, tuplets);
        }


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
        function initStave(x, y) {

            // Create a stave of width 800 at position 10, 40 on the canvas.
            _stave = new VF.Stave(x, y, 800);

            // Add a clef and time signature.
            _stave.addClef("percussion").addTimeSignature("4/4");

            // Connect it to the rendering context and draw!
            _stave.setContext(_context).draw();
        }

        function createVexNotes(notesToConvert) {
            var vexNotes = []
            
            notesToConvert.forEach(function(noteStructure) {
                
                vexNotes.push(
                    new Vex.Flow.StaveNote({
                        keys: [noteStructure.tune],
                        duration: noteStructure.time.toString()
                    })
                );

            });

            return vexNotes;
        }

        function addBeam(notes, firstNote, lastNote) {

            return new Vex.Flow.Beam(notes.slice(firstNote, lastNote));
        }

        function createTuplet(notes, first, last, numNotes = 3, numNoteOccupied = 2, ratioed = false) {
            var tuplet = 
                new Vex.Flow.Tuplet(notes.slice(first, last), {
                  num_notes: numNotes, 
                  notes_occupied: numNoteOccupied, 
                  ratioed: ratioed,
                });

            return tuplet;
        }

        function createVoice(notes) {
            // Create the voice:
            var voice = new Vex.Flow.Voice({num_beats:4, resolution:Vex.Flow.RESOLUTION})
            voice.addTickables(notes);

            // Format the voice:
            var formatter = new Vex.Flow.Formatter();
            formatter.format([voice], 775);

            return voice;
        }

        function draw(voice, beams, tuplets) {
            // Draw the voice
            voice.draw(_context, _stave);

            // Draw the beams
            beams.forEach(function(beam){
              beam.setContext(_context).draw();
            });

            if (typeof(tuplets) != "undefined" && tuplets.length > 0) {
                // Draw the tuplets
                tuplets.forEach(function(tuplet){
                  tuplet.setContext(_context).draw();
                });
            }
        }

        function example() {
            // Setup the notes array
            function addNotes() {
             
                var notes = [];

                notes = createVexNotes([
                    new Note(),
                    new Note(),
                    new Note(),
                    new Note(),
                    new Note(),
                ]);

                notes = createVexNotes([
                    new Note({tune : "d/4", time : "4"})
                ]);

                notes = createVexNotes([
                    new Note({tune : "b/4", time : "16"}),
                    new Note({tune : "a/4", time : "16"}),
                    new Note({tune : "c/4", time : "16"}),
                    new Note({tune : "b/4", time : "16"}),
                    new Note({tune : "e/4", time : "16"}),
                    new Note({tune : "e/5", time : "16"}),
                ]);

                notes = createVexNotes([
                    new Note({time : "8"}),
                    new Note({time : "8"}),
                    new Note({time : "8"}),
                ]);

                function addNote(noteStructure){
                  notes.push(
                    new Vex.Flow.StaveNote({
                        keys: [noteStructure[0]],
                        duration: noteStructure[1]
                    })
                  );
                }

                return notes;
            }

            // Setup the beams: we do this before defining tuplets so that default bracketing will work.
            function addBeams(notes) {
                var beams = [
                      [0, 5],
                      [6,12],
                      [12, 15]
                    ].map(function(i){
                        return addBeam(notes, i[0], i[1]);
                    });
            
                return beams;
            }

            // Setup the tuplets
            function createTuplets(notes) {
                var simpleQuintuplet = createTuplet(notes, 0, 5, 5, 4);
                var simpleSextuplet = createTuplet(notes, 6, 12, 6, 4);
                var simpleTriplet = createTuplet(notes, 12, 15);

                return [simpleQuintuplet, simpleSextuplet, simpleTriplet];
            }

            ////// N O T E S 
            var notes = addNotes();
            
            ////// B E A M S
            var beams = addBeams(notes);
            
            ////// T U P L E T S
            var tuplets = createTuplets(notes);

            ////// V O I C E
            var voice = createVoice(notes);

            ////// D R A W
            draw(voice, beams, tuplets);
        }

        



    return scoreManager;

})(Vex.Flow);
