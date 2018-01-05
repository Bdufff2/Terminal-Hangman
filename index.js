var inquirer = require('inquirer');
var Word = require('./game/Word.js');
var Game = require('./game/Game.js');


var hangman = {
    wordBank: possibleWords,
    guessesRemaining: 10,
    lettersGuessed: [],
    display: 0,
    currentWord: null,

    startGame: function () {
        var a = this;

        if (this.lettersGuessed.length > 0) {
            this.lettersGuessed = [];
        }

        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready?"
        }]).then(function (answer) {
            if (answer.play) {
                a.newGame();
            } else {
                console.log("Bye!");
            }
        })
    },
    newGame: function () {
        if (this.guessesRemaining === 10) {
            console.log("Alright, here we go!");
            console.log('*****************');

            var randNum = Math.floor(Math.random() * this.wordBank.length);
            this.currentWord = new Word(this.wordBank[randNum]);
            this.currentWord.findLetter();

            console.log(this.currentWord.renderWord());
            this.keepPrompting();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },
    resetGuessesRemaining: function () {
        this.guessesRemaining = 10;
    },
    keepPrompting: function () {
        var a = this;

        inquirer.prompt([{
            name: "letterSelected",
            type: "input",
            message: "Choose a letter: "
        }])
    }.then(function (ltr) {
        var letterReturned = (ltr.letterSelected).toUpperCase();
        var guessedAlready = false;
        for(var i = 0; i < a.lettersGuessed.length; i++){
          if(letterReturned === a.lettersGuessed[i]){
            guessedAlready = true;
          }
        }
        if(guessedAlready === false){
            a.lettersGuessed.push(letterReturned);
            
            var found = a.currentWord.seeIfLetterFound(letterReturned);
            if(found === 0){
                console.log('Try again.');
                a.guessesRemaining--;
                a.display++;
                console.log('Guesses remaining: ' + a.guessesRemaining);
                console.log(hangManDisplay[(a.display)-1]);
    
                console.log('\n*******************');
                console.log(a.currentWord.renderWord());
                console.log('\n*******************');
    
                console.log("Letters guessed: " + a.lettersGuessed);
              } else {
                console.log('You got it right!');
                if (a.currentWord.correctWord() === true){
                    console.log(a.currentWord.renderWord());
                    console.log('Congratulations, you win!');
                } else{
                    
                    console.log('Guesses remaining: ' + a.guessesRemaining);
                    console.log(a.currentWord.renderWord());
                    console.log('\n*******************');
                    console.log("Letters guessed: " + a.lettersGuessed);
                  }
              }
              if(a.guessesRemaining > 0 && a.currentWord.wordFound === false) {
                a.keepPrompting();
              }else if(a.guessesRemaining === 0){
                console.log('Game over!');
                console.log('The word you were guessing was: ' + a.currentWord.word);
              }
            } else{
                console.log("You've guessed a letter already. Try again.")
                a.keepPrompting();
              }
    })

}
hangman.startGame();