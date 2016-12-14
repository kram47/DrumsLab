/**
*
* @file
*     Block/Generator.js
* @description
*     A collection of useful Generators
* @author
*     marc charton
*
*/

/**
 * @module Generator
 */
var Generator = (function () {

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

    // Module Configuration
    var config = {

    };

    // Module name
    var _name = "Generator";

    // Module Method Exposition
    var Generator = {
        generateRandomBar : generateRandomBar
    };


    // -- -- P R I V A T E   P R O P E R T I E S -- --


    // -- -- P U B L I C   M E T H O D S -- --

    /**
     * @param {Object} settings - parameters for generation
     * @return {Bar} A bar generated randomly with optional parameters
     */
    function generateRandomBar(settings) {
        /*
        if (!(settings instanceof Object))
            throw {
                type : "bad parameter type",
                message : "settings should be an object"
            }
        */

        var signature = {
            amount : 4,
            value : 4
        };

        // TODO : faire une vraie randomization
        var bar = new Bar(
            [
                [
                    new Note({time:8, isTernary:false}),
                    new Note({time:8, isTernary:false}),
                ],
                [
                    new Note({time:4}),
                ],
                [
                    new Note({time:16}),
                    new Note({time:8}),
                    new Note({time:16}),
                ],
                [
                    new Note({time:8}),
                    new Note({time:16}),
                    new Note({time:16}),
                ],
            ], signature);

        return bar;
    }


    return Generator;

})();



