/**
*
* @file
*     model/Bar.js
* @description
*     Represent a Bar with all actions and components
* @author
*     marc charton
*
*/

/**
 * @class A bar with notes
 */
var Bar = (function() {

    /**
     * @constructor
     * @param {Note|Array|Array} beats the list of beats which cointain the notes of the bar to create
     * @param {Note|Array|Array} beats     [description]
     * @param {Object} signature The time signature of the bar
     */
    var Bar = function(beats, signature) {

        /* -- Parameters check -- */

        if (!(beats instanceof Array))
            throw {
                type : "bad parameter type",
                message : "beats should be an array",
            };

        if (!(signature instanceof Object))
            throw {
                type : "bad parameter type",
                message : `signature should be an object but is '${signature}'`,
            };


        /* -- Private members -- */

        var _name = "Bar";


        /* -- Public members -- */

        this.beats = beats;
        this.signature = signature;
        this.numberOfBeats = this.beats.length;


        /* -- Business Rules -- */

        // signature { amout, value }
        if (this.signature.amount != this.numberOfBeats)
        {
            throw {
                type : "data",
                message : "inconsistent time signature",
            };
        }

    }

    /*
        Construct a well-formatted bar
    */
    Bar.prototype.toString = function (name = "{BarName}") {

        var output = "";
        output += "-------------------------\n";
        output += "--- " + name + "\n";
        output += "-------------------------\n";

        for (var beat_i = 0 ; beat_i < this.numberOfbeat ; beat_i++) {

            var beatLength = this.arrays[beat_i].length;
            output += "[";
            for (var note_i = 0 ; note_i < beatLength ; note_i++) {
                if (note_i > 0)
                    output += ", ";
                output += this.arrays[beat_i][note_i];
            }
            output += "]\n";
        }

        output += "-------------------------\n";

        return output;
    };

    /*
        Set the value at {beat,note} coordinates in the bar
    */
    Bar.prototype.setNote = function (coordinates, value = app.config.note.NORMAL) {

        if (typeof(coordinates.beat) === "undefined" || typeof(coordinates.note) === "undefined")
            throw new RangeError("Bad Coordinates");

        if (coordinates.beat >= this.arrays.length || coordinates.beat < 0)
            throw new RangeError("Beat greater than bar or less than zero.");

        this.arrays[coordinates.beat][coordinates.note] = value;
    };

    /*
        Get the note at {beat,note} coordinates in the bar
    */
    Bar.prototype.getNote = function (coordinates) {

        if (typeof(coordinates.beat) === "undefined" || typeof(coordinates.note) === "undefined")
            throw new RangeError("Bad Coordinates");

        return this.arrays[coordinates.beat][coordinates.note];
    };

    /*
        Get the note at i position in the bar
    */
    Bar.prototype.getNoteByIndex = function (index) {

        if (index >= this.length || index < 0)
            throw new RangeError("Index can't be greater to bar's length");

        var flatBar = _.flatten(this.arrays);
        return flatBar[index];
    };

    /*
        Set the note at i position in the bar
    */
    Bar.prototype.setNoteByIndex = function (value, index) {

        if (index >= this.length || index < 0)
            throw new RangeError("Index can't be greater to bar's length");

        var coordinates = this.convertIndex2Coordinates(index);
        this.arrays[coordinates.beat][coordinates.note] = value;
    };

    /*
        Convert index number into 2 coordinates to access the 2 dimensional array easily
    */
    Bar.prototype.convertIndex2Coordinates = function (index) {

        if (index >= this.length || index < 0)
            throw new RangeError("Index can't be greater to bar's length");

        for (var beat_i = 0 ; beat_i < this.numberOfbeat ; beat_i++) {
            var beatLength = this.arrays[beat_i].length;
            for (var note_i = 0 ; note_i < beatLength ; note_i++) {
                if (index == 0){
                    return {
                        "beat" : beat_i,
                        "note" : note_i
                    }
                }
                index--;
            }
        }
    };

    /*
        Get all played notes
    */
    Bar.prototype.getPlayedNotes = function () {
        var noteList = [];

        for (var beat_i = 0 ; beat_i < this.numberOfbeat ; beat_i++) {
            var beatLength = this.arrays[beat_i].length;
            for (var note_i = 0 ; note_i < beatLength ; note_i++) {
                if (this.arrays[beat_i][note_i] != app.config.note.EMPTY) {
                    noteList.push({
                        "beat" : beat_i,
                        "note" : note_i
                    });
                }
            }
        }

        return noteList;
    };



    return Bar;

})();
