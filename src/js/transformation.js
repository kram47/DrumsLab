/**
 *
 * @file
 *     transformation.js
 * @description
 *     Transformations for music datas
 * @author
 *     marc charton
 *
 */

var transformation = transformation || {};

(function (self) {

    "use strict";
    var privates = {};
    var _name_ = "Transformation";

    /*
        Initialisation du module
     */
    self.init = function () {
        console.log("["+_name_+"] " + "Initialisation");
    };

    /*
        Conversion de débit d'une mesure.
        La mesure passe d'un débit A à un débit B, les notes restent les mêmes
     */
    self.convertBarFlow = function(bar, oldFlow, newFlow, fillGapMode) {
        var outputBar = [];
        var newBeat = [];
        var beatsNumber = bar.length;
        var i_beat, i_croche;
        var conversionDone = false;

        // Construction of a new bar from every note from the source
        for (var i = 0 ; i < newFlow * beatsNumber ; i++) {

            // We retrieve value from source until all data are converted to new bar
            if (!conversionDone) {
                i_beat = Math.floor(i / 4); // Get the current beat of the bar depending on 'i'
                i_croche = i % 4;           // Get the current croche of the beat depending on 'i'
                newBeat.push(bar[i_beat][i_croche]); // Add the croche to the new beat created
            }

            // If all conversion is done we fill in the blanks with values depending on fillGapMode value
            else {

                // TODO : comportement en fonction du type de gestion du gap
                switch(fillGapMode) {
                    case self.config.fillGapMode.empty:
                        console.log("je suis en mode empty");
                        newBeat.push(0);
                        break;
                    case self.config.fillGapMode.circle:
                        console.log("je suis en mode circle");
                        i_beat = Math.floor((i - oldFlow * beatsNumber) / 4);
                        i_croche = (i - oldFlow * beatsNumber) % 4;
                        newBeat.push(bar[i_beat][i_croche]);
                        break;
                    case self.config.fillGapMode.random:
                        console.log("je suis en mode random");
                        newBeat.push(Math.floor(Math.random() * 4));
                        break;
                    default:
                        console.log("pas de valeur");
                        newBeat.push(0);
                }
            }

            // If we are at the end of the current beat we push it to the bar and begin a new beat
            if (newBeat.length == newFlow) {
                outputBar.push(newBeat);
                newBeat = [];
            }
            if (i == oldFlow * beatsNumber - 1) {
                conversionDone = true;
            }
        }

        return outputBar;
    };


})(transformation);
