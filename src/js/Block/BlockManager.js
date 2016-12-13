/**
*
* @file
*     Block/BlockManager.js
* @description
*     Manager for blocks view of chops
        -> Manage the list of chop
        -> Manage the front part such as positions, colors etc
* @author
*     marc charton
*
*/

var BlockManager = (function () {

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

    // Module Configuration
    var config = {
        container : {
            name : 'canvas_container',
            width : 600,
            height : 1200
        },
        note : {
            yNoteSize : 20,
            xBeatSizeBase : 100,
        },
        noteTypes : [
            {
                "name" : "played",
                "notation" : 1,
                "color" : "90-#2980b9-#3498db",
                "class" : "score-played"
            },
            {
                "name" : "ghost",
                "notation" : 2,
                "color" : "90-#bdc3c7-#ecf0f1",
                "class" : "score-ghost"
            },
            {
                "name" : "accent",
                "notation" : 3,
                "color" : "90-#c0392b-#e74c3c",
                "class" : "score-accent"
            }
        ]
    };

    // Module name
    var _name = "BlockManager";

    // Module Method Exposition
    var blockManager = {
        config : config,
        init : init,
        drawRectangle : drawRectangle,
        drawNote : drawNote,
    };


    // -- -- P R I V A T E   P R O P E R T I E S -- --

    // RaphaelJS main object
    var _paper_;

    // Log d'un message avec le nom du module
    function log (message) {
        console.log("["+_name+"] " + message);
    };


    // -- -- P U B L I C   M E T H O D S -- --

    /*
        Initialisation du module
     */
    function init () {
        log("Initialisation");

        _paper_ = new Raphael(document.getElementById(config.container.name), config.container.width, config.container.height);
    };

    /*
        Dessine un rectangle
     */
    function drawRectangle(xStart, yStart, xSize, ySize) {
        var rectangle = _paper_.rect(xStart, yStart, xSize, ySize);
        return rectangle;
    };


    /*
        Dessine une note
            Prend en compte la taille standard d'une note
            Définit la longueur de la note en fonction de sa valeur temporelle
     */
    function drawNote(note, xStart, yStart) {

/*        
        4  =>  4/4;
        8  =>  2/4;
        16 =>  1/4;

        4  =>  2/3;
        8  =>  1/3;
*/

     /*   var binaryDuration =  [1, 2, 4];
        var ternaryDuration =  [1, 2];

        var beatDivision;
        beatDivision = note.isTernary? 3 : 4;

        var durationBase = 1 / beatDivision;
        var durationNote = (beatDivision * beatDivision) / note.time;

        // Si la note est pointée on ajoute la moitié du temps de sa durée.
        if (note.isDotted)
        {
            durationNote += (beatDivision * beatDivision) / (note.time * 2)
        }

*/

        var xSize = config.note.xBeatSizeBase * note.beatDuration;

        drawRectangle(xStart, yStart, xSize, config.note.yNoteSize);
    };

      /*
        Dessine une note
            Prend en compte la taille standard d'une note
            Définit la longueur de la note en fonction de sa valeur temporelle
     */
    function drawBeat() {

    };



    return blockManager;

})();
