var Bar = function(bar) {
    this.bar = bar;
    this.numberOfbeat = this.bar.length;

    var length = 0
    this.bar.forEach(function (beat){
        length += beat.length;
    });
    this.length = length;
}

/*
    Get the note at i position in the bar
*/
Bar.prototype.getScoreByIndex = function (index) {

    if (index >= this.length || index < 0)
        throw new RangeError("Index can't be greater to bar's length");

    var flatBar = _.flatten(this.bar);
    return flatBar[index];
};

/*
    Set the note at i position in the bar
*/
Bar.prototype.setScoreByIndex = function (value, index) {

    if (index >= this.length || index < 0)
        throw new RangeError("Index can't be greater to bar's length");

    var coordinates = this.convertIndexIntoCoordinates(index);
    this.bar[coordinates.beat][coordinates.note] = value;
};

/*
    Convert index number into 2 coordinates to access the 2 dimensional array easily
*/
Bar.prototype.convertIndexIntoCoordinates = function (index) {

    if (index >= this.length || index < 0)
        throw new RangeError("Index can't be greater to bar's length");

    for (var beat_i = 0 ; beat_i < this.numberOfbeat ; beat_i++) {
        var beatLength = this.bar[beat_i].length;
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


