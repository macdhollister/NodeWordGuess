const Letter = require('./Letter.js');

function Word(word) {
    // defines:
    // (1) array of new Letter objects
    // (2) function that returns string of the word
    // (3) function that takes a letter and guesses on each Letter object
    let letterArr = [];
    for (let i = 0; i < word.length; i++) letterArr.push(new Letter(word[i]));

    return {
        
    }
}