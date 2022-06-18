const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const guessForm = document.querySelector(".letter");
const body = document.querySelector("body");

let remainingGuesses = 10;
let word = "";
let guessedLetters = [];

//fetch a random word from on-line.
const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

//call up the getWord function above.
getWord();

// Display dot symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

//listen for the click to determine if the letter is correct.
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(word);
  //Empty message paragraph
  message.innerText = "";
  //grab what was entered
  const guess = letterInput.value;
  //make sure that it is a single letter, call up the validateInput function.
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // call up makeGuess function
    makeGuess(guess);
  }
  //clear the input box
  letterInput.value = "";
});

playAgainButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessLetterButton.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    guessForm.classList.remove("hide");
    playAgainButton.classList.add("hide");
    message.classList.remove("win");
    message.innerText = "";
    remainingGuesses = 10;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLetters = [];
    guessedLettersElement.innerHTML = "";
    getWord();
  });

//Does the input value meet the criteria?
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    // input meets criteria, return this letter to const goodGuess
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    // womp womp - bad guess, lose a chance
    message.innerText = `Sorry, the word has no ${guess}. You lose a guess.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word does have the letter ${guess} in it.`;
  }
console.log(remainingGuesses);
  if (remainingGuesses === 0) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;  
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
    } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  } 
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    body.classList.add("celebrate");
    startOver();
  }
};

const startOver = function(){
    guessLetterButton.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    guessForm.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

