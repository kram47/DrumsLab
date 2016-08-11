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

(function (publics){

    "use strict";
    var _name_ = "App";
    var privates = {};

    /*
        Initialisation du module
     */
    publics.init = function()
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

        // Launch tests
        var barBinary = [
            [0,2,2,0],
            [1,0,3,0],
            [0,0,1,1],
            [0,1,1,1],
        ];
        drumBlock.drawBar(barBinary);

        var ternaryBar = transformation.convertBarFlow(barBinary, config.flow.sixteenth, config.flow.triplet)
        drumBlock.drawBar(ternaryBar, 0, 75);


        $.getJSON( "data/ostinati.json", function( ostinati ) {
            console.log("j'ai récupéré le json !!");
            drumBlock.drawOstinatiList(ostinati);
        });
    }

})(app);
