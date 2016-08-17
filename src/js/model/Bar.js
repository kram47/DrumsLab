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

 var Bar = function(bar) {
    this.arrays = bar;
    this.numberOfbeat = this.arrays.length;

    var length = 0
    this.arrays.forEach(function (beat){
        length += beat.length;
    });
    this.length = length;
}

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


