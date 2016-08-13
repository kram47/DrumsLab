/**
 *
 * @file
 *     transformation.config.js
 * @description
 *     Configuration du module : transformation
 * @author
 *     marc charton
 *
 */

var transformation = transformation || {};

(function(self) {

    "use strict";

    self.config = self.config || {};

    self.config.fillGapMode = {
        "empty" : 0,
        "circle" : 1,
        "random" : 2
    };

})(transformation);
