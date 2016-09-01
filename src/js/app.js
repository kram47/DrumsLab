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
        DrumBlock.init();
        transformation.init();

        launchTest();
    };

    /*
        Lancement des tests de développement en cours
     */
    function launchTest() {

        //addAccent();
        //getNoteFromBar();
        conversion();
        //ostinatiList();
    }

    function conversion() {
        // Launch tests
        var barBinary = new Bar([
            [0,1,2,3],
            [1,0,0,1],
            [1,0,0,1],
            [8,9,10,11]
        ]);
        DrumBlock.drawBar(barBinary);


        var ternaryBar = transformation.convertBarFlow(
            barBinary,
            self.config.flow.sixteenth,
            self.config.flow.triplet,
            transformation.config.fillGapMode.empty);
        DrumBlock.drawBar(ternaryBar, 0, 75);
    };

    function ostinatiList() {
        $.getJSON( "data/ostinati.binaire.json", function( ostinati ) {
            console.log("j'ai récupéré le json !!");
            DrumBlock.drawOstinatiList(ostinati);
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

    function addAccent() {
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

        console.log("==================================");

        console.log("Intial values :");
        console.log(bar.toString("bar"));
        console.log(mask.toString("mask"));

        transformation.addAccent(bar, 5, false);
        console.log(bar.toString("bar (after accent on 5)"));

        transformation.addAccentFromMask(bar, mask);
        console.log(bar.toString("bar (after accent on mask [ghost=true])"));

        console.log("==================================");
    }

})(app);
