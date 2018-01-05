var Letter = function(letters){

    this.letter = letters;
    this.show = false;

    this.renderLetter = function() {
        if (this.letter == ' ') {
            this.show = true;
            return '  ';
        } else if (this.show === false){
            return ' _ ';
        } else {
            return this.letter;
        }
    };
};

modlue.exports = Letter;