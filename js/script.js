//Global variables
//The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
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
const guessedLetters = [];

//Add Placeholders for each letter
const placeHolder = function(word){
    const placeHolderDots = [];
    for (const letter of word){
        console.log(letter);
        placeHolderDots.push("●");
    }
    wordProgress.innerText = placeHolderDots.join("");
};

placeHolder(word);

buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();
    messages.innerText = "";
    const guess = letterInput.value;    
    const inputHolder = checkInput(guess);

    if (inputHolder) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

//function to check the validity of the input.
const checkInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = "You need to enter a letter! There are no spaces.";
    } else if (input.length > 1) {
         messages.innerText = "Please enter only one letter, and try again.";
        } else if (!input.match(acceptedLetter)){
            messages.innerText = "Please enter a letter from A to Z. Numbers and symboles are not allowed.";
            } else {
                 return input;
                }  
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        messages.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};







  
//const getData = async function () {
//    const res = await fetch(
//      "https://quote-garden.herokuapp.com/api/v3/quotes?author=beyonce"
//    );
//    const data = await res.json();
//    console.log(data);
// };
// getData();