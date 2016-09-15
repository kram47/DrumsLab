/**
 *
 * @file
 *     constants.js
 * @description
 *     List of constants
 * @author
 *     marc charton
 *
 */

var constants = (function() {

    "use strict";

    // Constants
    return {
        note : {
            type : {
                _NORMAL_ : 0,
                _CROSS_ : 1,
                _CROSS_CIRCLE_ : 2,
                _STAR_ : 3,
            },
            time : {
                _DOTTED_ : "d",
                _TERNARY_ : "t",
            },
            side : {
                _NONE_ : 0,
                _RIGHT_ : 1,
                _LEFT_ : 2,
            },
            fingering : {
                _NORMAL_ : 0,
                _FLAT_ : 1,
                _RA_ : 2,
                _CHEESE_ : 3,
            },
            accent : {
                _NORMAL_ : 0,
                _GHOST_ : 1,
                _ACCENT_ : 2,
            },
        }
    };

})();
