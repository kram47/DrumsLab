/**
 *
 * @file
 *     drumBlock.config.js
 * @description
 *     Configuration for module : drumBlock
 * @author
 *     marc charton
 *
 */

var drumBlock = drumBlock || {};

(function(self) {

    "use strict";

    self.config = {
        "types" : [
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

})(drumBlock);
