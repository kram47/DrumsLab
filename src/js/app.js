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
        var bar = new Bar([
            [0,1,2,3],
            [1,0,0,1],
            [1,0,0,1],
            [8,9,10,11]
        ]);
        var mask = new Bar([
            [0,0,0,1],
            [0,0,0,1],
            [0,0,0,1],
            [0,0,0,1]
        ]);

        //getNoteFromBar();
        //transformation.addAccent(bar, 5, false);

        console.log(bar.toString());

        transformation.addAccentFromMask(bar, mask);
        console.log(bar.toString());

        //conversion();
        ostinatiList();
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

    function getNoteFromBar() {
        console.log("============ GET NOTE FROM BAR ============");

        var bar = new Bar([
            [0,1,2,3],
            [1,0,0,1],
            [1,0,0,1],
            [8,9,10,11]
        ]);
        console.log("------ BAR ------");
        console.log(bar);


        console.log("------ Elements ------");
        for (var i = 0; i < 16; i++) {
            console.log("bar["+i+"] = " + bar.getNoteByIndex(i));
            console.log(bar.convertIndexIntoCoordinates(i));
            bar.setNoteByIndex(12, i);
        }
        console.log(bar);

        console.log("============ end of GET NOTE FROM BAR ============");
    }

})(app);
