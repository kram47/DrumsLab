(function ($){

  $(document).ready(function (){

    var paper = new Raphael(document.getElementById('canvas_container'), 600, 1200);

    function drawBeat(listNotes, xStart, yStart, baseBeatSize, beatSize) {
      var rectangles = [];

      listNotes.forEach(function (current, index, array){
        var rectangle = paper.rect(xStart + index * beatSize, yStart, beatSize, baseBeatSize);
        rectangle.node.setAttribute("class","score");

        if (current == 1)
          rectangle.node.setAttribute("class","score score-played");

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
        "text-anchor": "start"
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
      drawOstinatiList(ostinati);
    });

  });

})(jQuery);