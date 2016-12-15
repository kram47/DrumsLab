/**
 *
 * @file
 *     model/Note.js
 * @description
 *     Represent a Note with all actions and components
 * @author
 *     marc charton
 *
 */

/**
 * Class representing a Note with its characteristics
 * @class
 */
var Note = (function(){

    /**
     * @constructor
     * @param {object} settings - An object with parameters with used for instanciation
     */
    var Note = function(settings) {

        // Initialization with default values
        this.type = constants.note.type._NORMAL_;
        this.tune = "c/5";
        this.time = 16;
        this.isRest = false;
        this.isTernary = false;
        this.isDotted = false;
        this.side = constants.note.side._NONE_;
        this.fingering = constants.note.fingering._NORMAL_;
        this.accent = constants.note.accent._NORMAL_;

        // Recovery of param settings
        if (typeof(settings) != "undefined")
            retrieveSettings(this, settings);

        // Computation of properties
        this.beatDuration = this.GetNoteDurationInBeat();
    };

    /**
     * Retrieve all settings for object construction
     * @param  {Object}
     * @return {void}
     */
    function retrieveSettings(self, settings) {
        // TODO : rendre générique les vérification de valeurs settings

        if (typeof settings.type != "undefined")
        {
            if (typeof settings.type != "number")
                throw { message : "Bad 'note type' parameter type" };

            if (settings.type == constants.note.type._NORMAL_
             || settings.type == constants.note.type._CROSS_
             || settings.type == constants.note.type._CROSS_CIRCLE_
             || settings.type == constants.note.type._STAR_)
            {
                self.type = settings.type;
            } else {
                throw { message : "Bad note type" };
            }
        }

        if (typeof settings.tune != "undefined")
        {
            if (typeof settings.tune != "string")
                throw { message : "Bad 'note tune parameter type" };

            if (settingss.tune.match(/[ABCDEFG][#b]?\/[0-9]/g))
                self.tune = settings.tune;
            else
                throw { message : "Bad note tune" };
        }

        if (typeof settings.time != "undefined")
        {
            if (typeof settings.time != "number")
                throw { message : "Bad 'note time' parameter type" };

            if (Tools.isPowerOf2(settings.time)) {
                self.time = settings.time;
            } else {
                throw { message : "Bad note time" };
            }
        }

        if (typeof settings.isRest != "undefined")
        {
            if (typeof settings.isRest != "number")
                throw { message : "Bad 'note isRest' parameter type" };

            self.isRest = settings.isRest;
        }

        if (typeof settings.isTernary != "undefined")
        {
            if (typeof settings.isTernary != "boolean")
                throw { message : "Bad 'note isTernary' parameter type" };

            self.isTernary = settings.isTernary;
        }

        if (typeof settings.isDotted != "undefined")
        {
            if (typeof settings.isDotted != "boolean")
                throw { message : "Bad 'note isDotted' parameter type" };

            self.isDotted = settings.isDotted;
        }

        if (typeof settings.side != "undefined")
        {
            if (typeof settings.side != "number")
                throw { message : "Bad 'note side' parameter type" };

            if (settings.side == constants.note.side._NONE_
             || settings.side == constants.note.side._RIGHT_
             || settings.side == constants.note.side._LEFT_)
            {
                self.side = settings.side;
            } else {
                throw { message : "Bad 'note side'" };
            }
        }

        if (typeof settings.fingering != "undefined")
        {
            if (typeof settings.fingering != "number")
                throw { message : "Bad 'note fingering' parameter type" };

            if (settings.fingering == constants.note.fingering._NORMAL_
             || settings.fingering == constants.note.fingering._FLAT_
             || settings.fingering == constants.note.fingering._RA_
             || settings.fingering == constants.note.fingering._CHEESE_)
            {
                self.fingering = settings.fingering;
            } else {
                throw { message : "Bad 'note fingering'" };
            }
        }

        if (typeof settings.accent != "undefined")
        {
            if (typeof settings.accent != "number")
                throw { message : "Bad 'note accent' parameter type" };

            if (settings.accent == constants.note.accent._NORMAL_
             || settings.accent == constants.note.accent._GHOST_
             || settings.accent == constants.note.accent._ACCENT_)
            {
                self.accent = settings.accent;
            } else {
                throw { message : "Bad 'note accent'" };
            }
        }
    };

    /**
     * @param  {string} rawNote - the base note in raw format (ex: "4dtrLf" -> A ternary dotted rest time played with left hand as a fla)
     * @return {Note}
     */
    Note.prototype.createNoteFromRaw = function(rawNote) {

        console.log("ma note est : " + rawNote);

        var time,
            tune,
            isTernary,
            isDotted,
            isRest;

        isRest = (rawNote.indexOf('r') != -1)? true : false;
        isTernary = (rawNote.indexOf('t') != -1)? true : false;
        isDotted = (rawNote.indexOf('d') != -1)? true : false;
        time = rawNote.replace('d', '')
                      .replace('r', '')
                      .replace('t', '');
        tune = "c/5";

        return new Note({
            time: time,
            tune : tune,
            isRest : isRest,
            isTernary : isTernary,
            isDotted : isDotted,
        });
    };

    /**
     *  @returns {Number} the duration of the beat within a time
     */
    Note.prototype.GetNoteDurationInBeat = function() {

        // La base de calcul est la croches
        var crocheDivisionNumber = 8;

        // Calcul du rapport de division par rapport à la croche
        // Combien de note(s) de durée(s) "this.time" peut on mettre à la place d'une croche (la notion de ternaire n'intervient pas encore)
        var crocheMultiplicator = this.time / crocheDivisionNumber;

        // La croche binaire dure un demi temps
        var binaryCrocheDuration = 1/2;
        // La croche ternaire dure un tiers de temps
        var ternaryCrocheDuration = 1/3;

        // La durée de la note est {crocheMultiplicator} fois plus courte que la croche
        // On divise donc la durée de la croche qui convient pour avoir le temps final
        var noteDuration = this.isTernary
            ? (ternaryCrocheDuration / crocheMultiplicator)
            : (binaryCrocheDuration / crocheMultiplicator);

        // Si la note est pointée on ajoute la moitié de sa durée actuelle.
        if (this.isDotted)
        {
            var halfDuration = noteDuration / 2;
            noteDuration += halfDuration;
        }

        return noteDuration;
    };



    return Note;

})();
