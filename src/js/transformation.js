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

(function (publics) {

    "use strict";
    var privates = {};
    var _name_ = "Transformation";

    /*
        Initialisation du module
     */
    publics.init = function () {
        console.log("["+_name_+"] " + "Initialisation");
    };

    /*
        Conversion de débit d'une mesure.
        La mesure passe d'un débit A à un débit B, les notes restent les mêmes
     */
    publics.convertBarFlow = function(bar, oldFlow, newFlow) {
        var outputBar = [];
        var newBeat = [];
        var beatsNumber = bar.length;
        var i_beat, i_croche;

        for (var i = 0 ; i < oldFlow * beatsNumber ; i++) {
            i_beat = Math.floor(i / 4); // Get the current beat of the bar depending on 'i'
            i_croche = i % 4;           // Get the current croche of the beat depending on 'i'

            console.log("bar["+i_beat+"]["+i_croche+"] = " + bar[i_beat][i_croche]);

            newBeat.push(bar[i_beat][i_croche]);
            if (newBeat.length == newFlow) {
                outputBar.push(newBeat);
                newBeat = [];
                if (outputBar.length == bar.length) {
                    break;
                }
            }
        }

        console.log(outputBar);
        return outputBar;
    };


})(transformation);
