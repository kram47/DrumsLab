/**
*
* @file
*     model/EnrichedChop.js
* @description
*     Represent a list of notes (pattern) and informations about it in a usable format
* @author
*     marc charton
*
*/

var EnrichedChop = function(rawChop) {
    var _name = "EnrichedChop";
    var self = this;
    /*
        Log d'un message avec le nom du module
    */
    self.log = function(message) {
        console.log("["+_name+"] " + message);
    };

    self.title = rawChop.title;
    self.pattern = [];

    rawChop.pattern.forEach(function (note) {
        self.pattern.push(new Note({time: note}));
    });


};
