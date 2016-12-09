/**
 *
 * @file
 *     DrumBlock.js
 * @description
 *     Manage the drawing of rythm blocks
 * @author
 *     marc charton
 *
 */

var DrumBlock = (function() {

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

    // Module Configuration
    var config = {
        container : {
            name : 'canvas_container',
            width : 600,
            height : 1200
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
    var _name = "DrumBlock";

    // Module Method Exposition
    var drumBlock = {
        config : config,
        init : init,
        drawBeat : drawBeat,
        drawBar : drawBar,
        drawOstinatoBar : drawOstinatoBar,
        drawTitle : drawTitle,
        drawOstinatiList : drawOstinatiList
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
        Dessine un temps en blocs
     */
    function drawBeat(listNotes, xStart, yStart, baseBeatSize, beatSize) {
        var rectangles = [];

        listNotes.forEach(function (current, index, array){
            var rectangle = _paper_.rect(xStart + index * beatSize, yStart, beatSize, baseBeatSize);
            rectangle.node.setAttribute("class","score");

            var currentConfig = $.grep(config.noteTypes, function (item) { return item.notation == current });

            if (currentConfig != null && currentConfig.length > 0) {
                currentConfig = currentConfig[0];

                rectangle.node.setAttribute("class","score " + currentConfig.class);
                rectangle.attr({
                    "gradient": currentConfig.color
                });
            }

            rectangles.push({
                played : current,
                graphic : rectangle
            });
        });
    };


    function calculateBarTime(listNotes) {

        var totalTime = 0.0;
        
        listNotes.forEach(function (note) {

            totalTime += (1 / note.time);

        });

        return totalTime;
    }

    function calculateCrocheNumber(listNotes) {

        // TODO : calculer le débit ternaire ou non car calcul différent.
        var isTernary = false;

        // Unité de base est la double croche
        var unitTimeBase = 1/16; 

        var crocheNumber = 0;

        listNotes.forEach(function (note) {

            crocheNumber += ( 1 / note.time ) / unitTimeBase; // => (1/8) / (1/16) == 2

        });

        return crocheNumber;
    }

    /*
        Dessine une mesure en blocs
     */
    function drawBar(bar, xStart = 0, yStart = 0) {
        var xPosition = xStart, yPosition = yStart;
        var jeux = 3; // Jeux de 3px entre les temps de la mesure
        var baseBeatSize = 23; // Une double croche sera un carré de 23px
        var barSize = 100; // Une mesure sera longue de 100px

        // Ajout du jeux pour aérer l'affichage
        yPosition += jeux;

        // Dessin de chaque temps de la mesure
        bar.getArrays().forEach(function(listNotes) {
            
            var time = calculateBarTime(listNotes);
            if (time == 1/4)
            {
                var beatDivision = calculateCrocheNumber(listNotes);
                // Calcul de la longueur d'une division du temps (dépend du nombre de note dans le temps)
                var beatSize = (barSize - (2 * jeux)) / beatDivision;

                xPosition += jeux;
                // Dessin du temps (correspondant à x bloc carrés, x étant le nombre de note du temps)
                drawBeat(listNotes, xPosition, yPosition, baseBeatSize, beatSize);
                xPosition += beatDivision * beatSize;
                xPosition += jeux;
            }
        });
    };

    /*
        Dessine un ostinato à partir d'un temps en bloc
     */
    function drawOstinatoBar(ostinato, xStart = 0, yStart = 0) {
        var barToSend = Transformation.convertOstinatoBeatToBar(ostinato);
        var xPosition = xStart, yPosition = yStart;
        
        drawBar(barToSend, xPosition, yPosition);
    };

    /*
        Dessine un titre pour le bloc
     */
    // TODO : passer en web simple ??, pas besoin de svg pour un titre
    function drawTitle(ostinato, xStart = 0, yStart = 0) {
        var xPosition = xStart, yPosition = yStart;
        var text = _paper_.text(xPosition, yPosition, ostinato);

        text.node.setAttribute("class","bar-title");
        text.attr({
            "font-size": 15,
            "font-family": "Helvetica, sans-serif",
            "text-anchor": "start",
        });
    };

    /*
        Dessine la liste des otinati
     */
    // TODO : move to Transformation
    // juste le placement et titre à gérer
    // Faire quelquechose de dynamique prenant une liste de titre&mesure
    function drawOstinatiList(ostinati, xStart = 0, yStart = 0) {
        var xPosition = xStart, yPosition = yStart;

        ostinati.forEach(function(ostinatoToDraw, index) {

            var textXPostion = xPosition + 5, textYPostion = yPosition + (index * 100 + 10);
            var ostinatoXPostion = xPosition, ostinatoYPostion = yPosition + (index * 100 + 25);

            drawTitle(ostinatoToDraw.title, textXPostion, textYPostion);
            drawOstinatoBar(ostinatoToDraw.pattern, ostinatoXPostion, ostinatoYPostion);

        });

    };


    return drumBlock;

})();
