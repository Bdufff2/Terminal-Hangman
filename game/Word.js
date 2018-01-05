var Letter = require('./Letter.js');

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
            this.correctWord = true;
            return true;
        }
    };

    this.seeIfLetterFound = function (letterGuessed) {
        var returnThis = 0;
        this.letters.forEach(function (ltr) {
            if (ltr.letter === letterGuessed) {
                ltr.show = true;
                returnThis++
            }
        })
        return returnThis;
    };

    this.renderWord = function(){
        var display = '';
        a.letters.forEach(function(ltr){
            var currentLetter = ltr.renderLetter();
            display += currentLetter;
        });

        return display;
    };
}

module.exports = Word;
