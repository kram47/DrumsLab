/**
 *
 * @file
 *     model/Note.js
 * @description
 *     Represent a Note with all actions and components
 * @author
 *     marc charton
 *
 */

var Note = function(settings) {
    this.settings = settings;
};

/*
    Log bar a pretty way
*/
Note.prototype.toString = function (name = "{BarName}") {

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
