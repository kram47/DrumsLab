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

var Note = function(settings) {
    this.type = constants.note.type._NORMAL_;
    this.tune = "c/5";
    this.time = 16;
    this.isRest = false;
    this.isTernary = false;
    this.isDotted = false;
    this.side = constants.note.side._NONE_;
    this.fingering = constants.note.fingering._NORMAL_;
    this.accent = constants.note.accent._NORMAL_;

    // TODO : faire une récupération par attribut pour ajouter des vérifications.
    for(key in settings) {
        if(this.hasOwnProperty(key)) {
            this[key] = settings[key];
        }
    }

    
    this.beatDuration = this.GetNoteDurationInBeat();
};

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