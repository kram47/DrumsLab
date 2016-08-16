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

    /*
        Initialisation du module
     */
    self.init = function()
    {
        console.log("["+_name_+"] " + "Initialisation");

        // Initialisation of modules
        drumBlock.init();
        transformation.init();

        launchTest();
    };

    /*
        Lancement des tests de développement en cours
     */
    function launchTest() {

        var bar  = [
            [0,1,2,3],
            [1,0,0,1],
            [1,0,0,1],
            [8,9,10,11]
        ];

        var maMesure = new Bar(bar);
        console.log(maMesure);

        for (var i = 0; i < 16; i++)
            console.log("bar["+i+"] = " + maMesure.getScoreByIndex(i));
        console.log(maMesure.convertIndexIntoObject(6));

        //conversion();
        ostinatiList();


        // transformation.addAccent(bar, 5);
    }

    function conversion() {
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

    function ostinatiList() {
        $.getJSON( "data/ostinati.binaire.json", function( ostinati ) {
            console.log("j'ai récupéré le json !!");
            drumBlock.drawOstinatiList(ostinati);
        });
    };

})(app);
