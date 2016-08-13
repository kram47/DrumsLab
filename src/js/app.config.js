/**
 *
 * @file
 *     config.js
 * @description
 *     store the global configuration
 * @author
 *     marc charton
 *
 */

var app = app || {};

(function (self) {

    "use strict";

    self.config = {};

    /*
        Définit les débit de chaque division du temps
     */
    self.config.flow = {
        quarter : 1,
        eighth : 2,
        triplet : 3,
        sixteenth : 4,
        quintuplet : 5,
        sextuplet : 6,
        thirtySecond : 8,
    };

    /*
        Liste des rudiments de la batterie
     */
    self.config.rudiment = {
        "singleStroke" : {
            "fingering" : ["A"],
        },
        "doubleStroke" : {
            "fingering" : ["A,A"],
        },
        "paradiddle" : {
            "fingering" : ["A,B,A,A,B,A,B,B"],
        },
        "paradiddlediddle" : {
            "fingering" : ["A,B,A,A,B,B"],
        },
        "paraparadiddle" : {
            "fingering" : ["A,B,A,B,A,A,B,A,B,A,B,B"],
        },
    }

})(app);
