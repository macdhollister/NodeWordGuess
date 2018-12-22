const Word = require('./Word.js');
const inq = require('inquirer');
const randWords = require('random-words');

function newGame() {
    // defines game stats
    let gameWord = new Word(randWords());
    let guessesLeft;
    let guessedLetters = [];

    // prints out blanks
    // prompts user for alphabetic character
        // needs error handling for nonalphabetic characters or inputs of multiple characters
    // repeats prompt until win or loss
    difficultyChoices = ['easy (10 guesses)', 'medium (7 guesses)', 'hard (5 guesses)'];
    inq.prompt([
        {
            type: 'list',
            message: 'Select a difficulty: ',
            choices: difficultyChoices,
            name: 'difficulty'
        }
    ]).then(function(response) {
        if (response.difficulty === difficultyChoices[0]) {
            guessesLeft = 10;
        } else if (response.difficulty === difficultyChoices[1]) {
            guessesLeft = 7;
        } else if (response.difficulty === difficultyChoices[2]) {
            guessesLeft = 5;
        }

        console.log('' + gameWord);
        promptGuess(guessesLeft);
    })

    function promptGuess(n) {
        if (n > 0) {
            let lettersGuessed = '';
            if(guessedLetters.length) lettersGuessed = `Letters Guessed: ${guessedLetters}\r\n`;
            inq.prompt([
                {
                    type: 'input',
                    message: `${lettersGuessed}Guess a letter: `,
                    name: 'userGuess'
                }
            ]).then(function(response) {
                let userGuess = response.userGuess;
                if (userGuess.match(/[a-z]/i) 
                        && userGuess.length === 1 
                        && !guessedLetters.includes(userGuess)) {

                    guessedLetters.push(userGuess);
                    let before = '' + gameWord;
                    gameWord.guess(userGuess);
                    let after = '' + gameWord;

                    let guessCorrect = before !== after;

                    if (guessCorrect) {
                        console.log('CORRECT!');
                        console.log(n + ' guesses left');
                        console.log('' + gameWord);
                        if (!gameWord.toString().includes('_')) n = 0;
                        promptGuess(n);
                    } else {
                        console.log('WRONG!');
                        console.log(n-1 + ' guesses left');
                        console.log('' + gameWord);
                        promptGuess(n-1);
                    }
                } else {
                    if (guessedLetters.includes(userGuess)) console.log("You've already guessed that letter!");
                    else console.log('You need to guess a letter');
                    console.log(n + ' guesses left');
                    console.log('' + gameWord);
                    promptGuess(n);
                }

            })
        } else {
            let userLost = gameWord.toString().includes('_');

            if (userLost) {
                console.log('You lose!');
            } else {
                console.log('You win!');
            }

            inq.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to play again?',
                    name: 'playAgain'
                }
            ]).then(function(response) {
                if (response.playAgain) {
                    newGame();
                }
            })
        }
    }
}

newGame();