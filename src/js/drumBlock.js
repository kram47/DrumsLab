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

var drumBlock = drumBlock || {};

(function(publics) {

    "use strict";

    var privates = {};
    var _name_ = "DrumBlock";
    var _paper_;

    /*
        Initialisation du module
     */
    publics.init = function () {
        console.log("["+_name_+"] " + "Initialisation");

        _paper_ = new Raphael(document.getElementById('canvas_container'), 600, 1200);
    };

    /*
        Dessine un temps en blocs
     */
    publics.drawBeat = function(listNotes, xStart, yStart, baseBeatSize, beatSize) {
        var rectangles = [];

        listNotes.forEach(function (current, index, array){
            var rectangle = _paper_.rect(xStart + index * beatSize, yStart, beatSize, baseBeatSize);
            rectangle.node.setAttribute("class","score");

            if (current == 1) {
                rectangle.node.setAttribute("class","score score-played");
                rectangle.attr({
                    "gradient": '90-#2980b9-#3498db'
                });
            }

            if (current == 2) {
                rectangle.node.setAttribute("class","score score-ghost");
                rectangle.attr({
                    "gradient": '90-#bdc3c7-#ecf0f1'
                });
            }

            if (current == 3) {
                rectangle.node.setAttribute("class","score score-accent");
                rectangle.attr({
                    "gradient": '90-#c0392b-#e74c3c'
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
    publics.drawBar = function(bar, xStart = 0, yStart = 0) {
        var xPosition = xStart, yPosition = yStart;
        var jeux = 3; // Jeux de 3px entre les temps de la mesure
        var baseBeatSize = 23; // Une double croche sera un carré de 23px
        var barSize = 100; // Une mesure sera longue de 100px

        // Ajout du jeux pour aérer l'affichage
        yPosition += jeux;

        // Dessin de chaque temps de la mesure
        bar.forEach(function(listNotes) {
                var beatDivision = listNotes.length;
                // Calcul de la longueur d'une division du temps (dépend du nombre de note dans le temps)
                var beatSize = (barSize - (2 * jeux)) / beatDivision;

                xPosition += jeux;
                // Dessin du temps (correspondant à x bloc carrés, x étant le nombre de note du temps)
                publics.drawBeat(listNotes, xPosition, yPosition, baseBeatSize, beatSize);
                xPosition += beatDivision * beatSize;
                xPosition += jeux;
        });
    };

    /*
        Dessine un ostinato à partir d'un temps en bloc
     */
    // TODO : move to transformation
    publics.drawOstinatoBar = function(ostinato, xStart = 0, yStart = 0) {
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

        publics.drawBar(bar, xPosition, yPosition);
    };

    /*
        Dessine un titre pour le bloc
     */
    // TODO : passer en web simple ??, pas besoin de svg pour un titre
    publics.drawTitle = function(ostinato, xStart = 0, yStart = 0) {
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
    // TODO : move to transformation
    // juste le placement et titre à gérer
    // Faire quelquechose de dynamique prenant une liste de titre&mesure
    publics.drawOstinatiList = function(ostinati, xStart = 0, yStart = 0) {
        var xPosition = xStart, yPosition = yStart;

        for (var i = 0 ; i < ostinati.length ; i++) {
            var ostinatoToDraw = ostinati[i];
            var textXPostion = xPosition + 5, textYPostion = yPosition + (i * 75 + 10);
            var ostinatoXPostion = xPosition, ostinatoYPostion = yPosition + (i * 75 + 25);

            publics.drawTitle(ostinatoToDraw.title, textXPostion, textYPostion);
            publics.drawOstinatoBar(ostinatoToDraw.rythmCode, ostinatoXPostion, ostinatoYPostion);
        }
    };

})(drumBlock);
