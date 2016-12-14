/**
 *
 * @file
 *     FileManager.js
 * @description
 *     Manager for manipulation of files
 * @author
 *     marc charton
 *
 */

var FileManager = (function () {

   "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

    // Module Configuration
    var config = {
    };

    // Module name
    var _name = "FileManager";

    // Module Method Exposition
    var fileManager = {
        config : config,
        init : init,
        convertRawChopToRichChop : convertRawChopToRichChop,
    };

    // -- -- P R I V A T E   P R O P E R T I E S -- --

    // Log d'un message avec le nom du module
    function log (message) {
        console.log("["+_name+"] " + message);
    };



    // -- -- P U B L I C   M E T H O D S -- --

    /*
        Initialisation du module
     */
    function init() {
        console.log("["+_name+"] " + "Initialisation");
    };

    

    /*
        Convert raw file format (raw chop) to usable data (rich chop)
    */
    function convertRawChopToRichChop(rawChopList) {
        
        var richChopList = [];

        rawChopList.forEach(function (rawChop, index) {
            var item = new RichChop(rawChop);
            richChopList.push(item);
        });

        return richChopList;
    };

    return fileManager;

})();
