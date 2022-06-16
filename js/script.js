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
const message = document.querySelector(".message");
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

//Event listening for a click of the button.
buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;    
    const goodGuess = checkInput(guess);

    if (goodGuess) {
    makeGuess(guess);
    }
    letterInput.value = "";
});

//function to check the validity of the input and displays a comment.
const checkInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "You need to enter a letter! There are no spaces.";
    } else if (input.length > 1) {
         message.innerText = "Please enter only one letter, and try again.";
        } else if (!input.match(acceptedLetter)){
            message.innerText = "Please enter a letter from A to Z. Numbers and symboles are not allowed.";
            } else {
                 return input;
                }  
};

//Capitalizes the guessed letter and checks to see if it has already been guessed.
const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        displayGuessedLetters();
        updateWordProgress(guessedLetters);
    }
};

//saves and displays the guessed letters.
const displayGuessedLetters = function (){
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//Replaces the dots with correct letters.
const updateWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealTheWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
        revealTheWord.push(letter.toUpperCase());
    } else {
      revealTheWord.push("●");
    }
    }
    wordProgress.innerText = revealTheWord.join("");
    checkIfWon();
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
