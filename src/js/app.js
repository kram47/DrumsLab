/**
 *
 * @file
 *     app.js
 * @description
 *     launch the modules and tests
 * @author
 *     marc charton
 *
 */

var app = app || {};

(function (self){

    "use strict";
    var _name_ = "App";
    var privates = {};

    /*
        Initialisation du module
     */
    self.init = function()
    {
        console.log("["+_name_+"] " + "Initialisation");

        // Initialisation of modules
        drumBlock.init();
        transformation.init();

        privates.launchTest();
    };

    /*
        Lancement des tests de développement en cours
     */
    privates.launchTest = function () {

        var bar  = [
            [0,1,2,3],
            [1,0,0,1],
            [1,0,0,1],
            [8,9,10,11]
        ];

        var maMesure = new Bar(bar);
        console.log(maMesure);
        console.log(maMesure.getScoreByIndex(15));
        console.log(maMesure.convertIndexIntoObject(6));

        privates.conversion();
        //privates.ostinatiList();


        // transformation.addAccent(bar, 5);

    }

    privates.conversion = function() {
        // Launch tests
        var barBinary = [
            [1,0,0,1],
            [1,0,0,1],
            [1,0,0,1],
            [1,0,0,1],
        ];
        drumBlock.drawBar(barBinary);


        var ternaryBar = transformation.convertBarFlow(
            barBinary,
            self.config.flow.sixteenth,
            self.config.flow.sextuplet,
            transformation.config.fillGapMode.empty);
        drumBlock.drawBar(ternaryBar, 0, 75);
    };

    privates.ostinatiList = function() {
        $.getJSON( "data/ostinati.binaire.json", function( ostinati ) {
            console.log("j'ai récupéré le json !!");
            drumBlock.drawOstinatiList(ostinati);
        });
    };

})(app);
