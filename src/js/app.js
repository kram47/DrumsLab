(function ($){

    $(document).ready(function (){

        var paper = new Raphael(document.getElementById('canvas_container'), 600, 1200);

        var flow = {
            quarter : 1,
            eighth : 2,
            triplet : 3,
            sixteenth : 4,
            quintuplet : 5
            sextolet : 6,
            thirtySecond : 8,
        };

        function drawBeat(listNotes, xStart, yStart, baseBeatSize, beatSize) {
            var rectangles = [];

            listNotes.forEach(function (current, index, array){
                var rectangle = paper.rect(xStart + index * beatSize, yStart, beatSize, baseBeatSize);
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
        }
        function drawMeasure(measure, xStart = 0, yStart = 0) {
            var xPosition = xStart, yPosition = yStart;
            var jeux = 3; // Jeux de 3px entre les temps de la mesure
            var baseBeatSize = 23; // Une double croche sera un carré de 23px
            var measureSize = 100; // Une mesure sera longue de 100px

            // Ajout du jeux pour aérer l'affichage
            yPosition += jeux;

            // Dessin de chaque temps de la mesure
            measure.forEach(function(listNotes) {
                    var beatDivision = listNotes.length;
                    // Calcul de la longueur d'une division du temps (dépend du nombre de note dans le temps)
                    var beatSize = (measureSize - (2 * jeux)) / beatDivision;

                    xPosition += jeux;
                    // Dessin du temps (correspondant à x bloc carrés, x étant le nombre de note du temps)
                    drawBeat(listNotes, xPosition, yPosition, baseBeatSize, beatSize);
                    xPosition += beatDivision * beatSize;
                    xPosition += jeux;
            });
        }
        function drawOstinatoMeasure(ostinato, xStart = 0, yStart = 0) {
            var xPosition = xStart, yPosition = yStart;
            var measure = [];

            /*
            measure = [
                [0,0,1,0], // Beat (Ostinato)
                [0,0,1,0], // Beat (Ostinato)
                [0,0,1,0], // Beat (Ostinato)
                [0,0,1,0], // Beat (Ostinato)
            ]
            */

            for ( i = 0 ; i < 4 ; i++ ) {
                measure.push(ostinato);
            }

            drawMeasure(measure, xPosition, yPosition);
        }
        function drawTitle(ostinato, xStart = 0, yStart = 0) {
            var xPosition = xStart, yPosition = yStart;
            var text = paper.text(xPosition, yPosition, ostinato);

            text.node.setAttribute("class","measure-title");
            text.attr({
                "font-size": 15,
                "font-family": "Helvetica, sans-serif",
                "text-anchor": "start",
            });
        }
        function drawOstinatiList(ostinati, xStart = 0, yStart = 0) {
            var xPosition = xStart, yPosition = yStart;

            for (var i = 0 ; i < ostinati.length ; i++) {
                var ostinatoToDraw = ostinati[i];
                var textXPostion = xPosition + 5, textYPostion = yPosition + (i * 75 + 10);
                var ostinatoXPostion = xPosition, ostinatoYPostion = yPosition + (i * 75 + 25);

                drawTitle(ostinatoToDraw.title, textXPostion, textYPostion);
                drawOstinatoMeasure(ostinatoToDraw.rythmCode, ostinatoXPostion, ostinatoYPostion);
            }
        }


        $.getJSON( "data/ostinati.json", function( ostinati ) {
            console.log("j'ai récupéré le json !!");
            // drawOstinatiList(ostinati);
        });

        measureBinary = [
            [0,2,2,0],
            [1,0,3,0],
            [0,0,1,1],
            [0,1,1,1],
        ];
        drawMeasure(measureBinary);


        function convertMeasureFlow(measure, oldFlow, newFlow) {
            var outputMeasure = [];
            var newBeat = [];
            var beatsNumber = measure.length;
            var i_beat, i_croche;

            for (i = 0 ; i < oldFlow * beatsNumber ; i++) {
                i_beat = Math.floor(i / 4); // Get the current beat of the measure depending on 'i'
                i_croche = i % 4;           // Get the current croche of the beat depending on 'i'

                console.log("measure["+i_beat+"]["+i_croche+"] = " + measure[i_beat][i_croche]);

                newBeat.push(measure[i_beat][i_croche]);
                if (newBeat.length == newFlow) {
                    outputMeasure.push(newBeat);
                    newBeat = [];
                    if (outputMeasure.length == measure.length) {
                        break;
                    }
                }
            }

            console.log(outputMeasure);
            return outputMeasure;
        }


        var ternaryMeasure = convertMeasureFlow(measureBinary, flow.sixteenth, flow.triplet)

        drawMeasure(ternaryMeasure, 0, 75);

    });

})(jQuery);
