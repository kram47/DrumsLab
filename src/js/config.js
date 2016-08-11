/**
 *
 * @file
 *     config.js
 * @description
 *     store the global configuration
 * @author
 *     marc charton
 *
 */

var config = config || {};

(function (publics) {

    "use strict";

    var privates = {};
    var _name_ = "Config";

    /*
        Définit les débit de chaque division du temps
     */
    publics.flow = {
        quarter : 1,
        eighth : 2,
        triplet : 3,
        sixteenth : 4,
        quintuplet : 5,
        sextolet : 6,
        thirtySecond : 8,
    };

})(config);
