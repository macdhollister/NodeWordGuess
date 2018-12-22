function Letter(char) {
    // defines:
    // (1) string value for underlying character (letter)
    // (2) boolean (if the letter has been guessed)
    // (3) function returning underlying character if it has been guessed, or a placeholder ('_') if not guessed yet
    // (4) function that takes a character, checks against (1), and updates (2)

    return {
        char : char,
        isGuessed : false,
        display : function() {
            if (this.isGuessed) {
                return this.char;
            } else {
                return '_';
            }
        },
        guess : function(userGuess) {
            if (userGuess === this.char) {
                this.isGuessed = true;
            }
            this.display();
        }
    }
}