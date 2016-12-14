/**
*
* @file
*     model/RichChop.js
* @description
*     Represent a list of notes (pattern) and informations about it in a usable format
* @author
*     marc charton
*
*/

var RichChop = function(rawChop) {
    var _name = "RichChop";
    var self = this;

    self.title = rawChop.title;
    self.pattern = [];

    rawChop.pattern.forEach(function (note) {
        var richNote = self.createRichNoteFromRaw(note);
        self.pattern.push(richNote);
    });


    /*
        Log d'un message avec le nom du module
    */
    self.log = function(message) {
        console.log("["+_name+"] " + message);
    };
};


RichChop.prototype.createRichNoteFromRaw = function(rawNote) {

    console.log("ma note est : " + rawNote);

    var time,
        tune,
        isTernary,
        isDotted,
        isRest;

    isRest = (rawNote.indexOf('r') != -1)? true : false;
    isTernary = (rawNote.indexOf('t') != -1)? true : false;
    isDotted = (rawNote.indexOf('d') != -1)? true : false;
    time = rawNote.replace('d', '')
                  .replace('r', '')
                  .replace('t', '');
    tune = "c/5";

    return new Note({
        time: time,
        tune : tune,
        isRest : isRest,
        isTernary : isTernary,
        isDotted : isDotted,
    });
};


RichChop.prototype.IsTernary = function() {
    return self.isTernary;
}
RichChop.prototype.IsDotted = function() {
    return self.isDotted;
}
RichChop.prototype.IsRest = function() {
    return self.isRest;
}
