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
        var beatsNumber = bar.numberOfbeat;
        var i_beat, i_croche;
        var conversionDone = false;

        // Construction of a new bar from every note from the source
        for (var i = 0 ; i < newFlow * beatsNumber ; i++) {

            // We retrieve value from source until all notes have been converted to new bar
            if (!conversionDone) {
                i_beat = Math.floor(i / 4); // Get the current beat of the bar depending on 'i'
                i_croche = i % 4;           // Get the current croche of the beat depending on 'i'

                // Add the note to the new beat created
                newBeat.push(bar.getNote({
                    beat : i_beat,
                    note : i_croche
                }));
            }

            // If all conversion is done we fill in the blanks with values depending on fillGapMode value
            else {

                switch(fillGapMode) {
                    case self.config.fillGapMode.empty:
                        console.log("je suis en mode empty");
                        newBeat.push(0);
                        break;
                    case self.config.fillGapMode.circle:
                        console.log("je suis en mode circle");
                        i_beat = Math.floor((i - oldFlow * beatsNumber) / 4);
                        i_croche = (i - oldFlow * beatsNumber) % 4;
                        newBeat.push(bar.getNote({
                            beat : i_beat,
                            note : i_croche
                        }));
                        break;
                    case self.config.fillGapMode.random:
                        console.log("je suis en mode random");
                        newBeat.push(_.random(0, 4));
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

        return new Bar(outputBar);
    };


    /*
        Ajout d'un accent sur la Nième croche,
        le reste est rendu ghost si ghost=true
     */
    self.addAccent = function(bar, index, ghost = true) {

        if (ghost == true) {
            var playedNotes = bar.getPlayedNotes();
            _.forEach(playedNotes, function (coord) {
                bar.setNote(coord, app.config.note.GHOST);
            });
        }

        var barToReturn = bar.setNoteByIndex(app.config.note.ACCENT, index)

        return barToReturn;
    };

    /*
        Ajout d'un accent sur les notes de la mesure "masque"
        le reste est rendu ghost si ghost=true
     */
    self.addAccentFromMask = function(bar, mask, ghost = true) {

        // La taille de la mesure et du masque doivent être identique
        if (bar.numberOfbeat != mask.numberOfbeat) {
            throw new TypeError("The bar and mask are not consistent.");
        }

        // On rend ghost toutes les notes jouées de la mesure
        if (ghost == true) {
            var playedNotes = bar.getPlayedNotes();
            _.forEach(playedNotes, function (coord) {
                bar.setNote(coord, app.config.note.GHOST);
            });
        }

        // On accentue toutes les notes jouées du masque
        var playedMask = mask.getPlayedNotes();
        _.forEach(playedMask, function (coord) {
            bar.setNote(coord, app.config.note.ACCENT);
        });

        return bar;
    };


})(transformation);
