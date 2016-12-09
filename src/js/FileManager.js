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
        convertRawChopToEnrichedChop : convertRawChopToEnrichedChop,
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
        Convert raw file format (raw chop) to usable data (enriched chop)
    */
    function convertRawChopToEnrichedChop(rawChopList) {
        
        var enrichedChopList = [];

        rawChopList.forEach(function (rawChop, index) {
            var item = new EnrichedChop(rawChop);
            enrichedChopList.push(item);
        });

        return enrichedChopList;
    };

    return fileManager;

})();
