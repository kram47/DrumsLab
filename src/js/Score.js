/**
 *
 * @file
 *     Score.js
 * @description
 *     Manage the drawing of partitions staves
 * @author
 *     marc charton
 *
 */

var Score = (function(VF) {

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

        // Module Configuration
        var config = {
            types : [
                {
                    "name" : "played",
                    "notation" : 1,
                    "color" : "90-#2980b9-#3498db",
                    "class" : "score-played"
                },
                {
                    "name" : "ghost",
                    "notation" : 2,
                    "color" : "90-#bdc3c7-#ecf0f1",
                    "class" : "score-ghost"
                },
                {
                    "name" : "accent",
                    "notation" : 3,
                    "color" : "90-#c0392b-#e74c3c",
                    "class" : "score-accent"
                }
            ]
        };

        // Module name
        var _name = "Score";

        // Module Method Exposition
        var partition = {
            config : config,
            init : init,
        };


    // -- -- P R I V A T E   P R O P E R T I E S -- --

        /*
            Log d'un message avec le nom du module
         */
        function log (message) {
            console.log("["+_name+"] " + message);
        };


        // -- -- P U B L I C   M E T H O D S -- --

        /*
            Initialisation du module
         */
        function init () {
            log("Initialisation");

            // Create an SVG renderer and attach it to the DIV element named "vexflow_container".
            var div = document.getElementById("vexflow_container")
            var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

            // Configure the rendering context.
            renderer.resize(1000, 500);
            var context = renderer.getContext();
            context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        };

    return partition;

})(Vex.Flow);
