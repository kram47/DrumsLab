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
    this.type = constants.note.type._NORMAL_;
    this.note = "c/5";
    this.time = 4;
    this.rest = 0;
    this.side = constants.note.side._NONE_;
    this.fingering = constants.note.fingering._NORMAL_;
    this.accent = constants.note.accent._NORMAL_;

    for(key in settings) {
        if(this.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }
};
