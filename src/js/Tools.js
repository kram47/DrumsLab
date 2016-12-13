/**
*
* @file
*     Block/Tools.js
* @description
*     A collection of utility tools
* @author
*     marc charton
*
*/

/**
 * @module Tools
 */
var Tools = (function () {

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

    // Module Configuration
    var config = {
        
    };

    // Module name
    var _name = "Tools";

    // Module Method Exposition
    var tools = {
        isPowerOf2 : isPowerOf2
    };


    // -- -- P R I V A T E   P R O P E R T I E S -- --


    // -- -- P U B L I C   M E T H O D S -- --

    /**
     * @param {int} n - the number to ckheck
     * @return {bool} true if the number is a power of 2
     */
    function isPowerOf2(n) {
        if (typeof n !== 'number')
            return 'Not a number';
        return n && (n & (n - 1)) === 0;
    }


    return tools;

})();



