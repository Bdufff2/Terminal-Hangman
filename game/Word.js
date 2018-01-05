var Letter = require('Letter.js');

// create function for words to display the words
function Word(wrd) {
    var a = this;

    this.word = wrd;
    this.letters = [];
    this.wordCorrect = false;

    this.findLetter = function () {
        for (var i = 0; i < a.word.length; i++) {
            var nextLetter = new Letter(a.word[i]);
            this.letters.push(nextLetter);
        }
    };

    this.correctWord = function () {
        if (this.letters.every(function (ltr) {
            return ltr.show === true;
        })) {
            this.wordFound = true;
            return true;
        }

    };


}

module.exports = Word;
