/**
 *
 * @file
 *     drumBlock.js
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
        types : [
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


    // -- -- P U B L I C   M E T H O D S -- --

    /*
        Initialisation du module
     */
    function init () {
        console.log("["+_name+"] " + "Initialisation");

        _paper_ = new Raphael(document.getElementById('canvas_container'), 600, 1200);
    };

    /*
        Dessine un temps en blocs
     */
    function drawBeat(listNotes, xStart, yStart, baseBeatSize, beatSize) {
        var rectangles = [];

        listNotes.forEach(function (current, index, array){
            var rectangle = _paper_.rect(xStart + index * beatSize, yStart, beatSize, baseBeatSize);
            rectangle.node.setAttribute("class","score");

            var currentConfig = $.grep(config.types, function (item) { return item.notation == current });

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
        bar.arrays.forEach(function(listNotes) {
                var beatDivision = listNotes.length;
                // Calcul de la longueur d'une division du temps (dépend du nombre de note dans le temps)
                var beatSize = (barSize - (2 * jeux)) / beatDivision;

                xPosition += jeux;
                // Dessin du temps (correspondant à x bloc carrés, x étant le nombre de note du temps)
                drawBeat(listNotes, xPosition, yPosition, baseBeatSize, beatSize);
                xPosition += beatDivision * beatSize;
                xPosition += jeux;
        });
    };

    /*
        Dessine un ostinato à partir d'un temps en bloc
     */
    // TODO : move to Transformation
    function drawOstinatoBar(ostinato, xStart = 0, yStart = 0) {
        var xPosition = xStart, yPosition = yStart;
        var bar = [];

        /*
        bar = [
            [0,0,1,0], // Beat (Ostinato)
            [0,0,1,0], // Beat (Ostinato)
            [0,0,1,0], // Beat (Ostinato)
            [0,0,1,0], // Beat (Ostinato)
        ]
        */

        for ( var i = 0 ; i < 4 ; i++ ) {
            bar.push(ostinato);
        }

        drawBar(bar, xPosition, yPosition);
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

        for (var i = 0 ; i < ostinati.length ; i++) {
            var ostinatoToDraw = ostinati[i];
            var textXPostion = xPosition + 5, textYPostion = yPosition + (i * 75 + 10);
            var ostinatoXPostion = xPosition, ostinatoYPostion = yPosition + (i * 75 + 25);

            drawTitle(ostinatoToDraw.title, textXPostion, textYPostion);
            drawOstinatoBar(ostinatoToDraw.rythmCode, ostinatoXPostion, ostinatoYPostion);
        }
    };


    return drumBlock;

})();
