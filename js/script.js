//Global variables
//The unordered list where the player’s guessed letters will appear.
const guessLetters = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const buttonGuess = document.querySelector(".guess");
//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear.
const wordProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const spanGuesses = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const messages = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again.
const buttonPlayAgain = document.querySelector(".play-again");

const word = "magnolia";

//Add Placeholders for each letter
const placeHolder = function(word){
    const dotSymbols = [];
    for (const letter of word){
        console.log(letter);
        dotSymbols.push("●");
    }
    wordProgress.innerText = dotSymbols.join("");
};

placeHolder(word);

buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";  
});


  
