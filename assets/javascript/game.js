//breed array: rough collie, standard poodle, staffordshire bull terrier, beagle, german shepherd, border collie, golden retriever, labrador retriever, plott hound, rat terrier, chihuahua, pug, "boxer", "dalmation", "siberian husky", "petit basset griffon vendeen", "newfoundland", "basset hound", "xoloitzcuintli"

var wordsList = ["rough collie", "standard poodle", "american staffordshire terrier", "beagle", "german shepherd", "border collie", "golden retriever", "labrador retriever", "plott hound", "rat terrier", "chihuahua", "pug", "boxer", "dalmation", "siberian husky", "petit basset griffon vendeen", "newfoundland", "basset hound", "xoloitzcuintli"];

var chosenWord  = ""; // solution will be held here.
var lettersInChosenWord = []; // This will break the solution into individual letters to be stored in array
var numBlanks = 0; // This will be the number of blanks we show based on the solution
var blanksAndSuccesses = []; // Holds a mix of blank and solved letters (ex: 'n, _ _, n, _') 
var wrongGuesses = []; // Holds all of the wrong guesses

// Game counters
var winCounter  = 0;
var lossCounter = 0;
var numGuesses  = 0;

//game function
//start and restart game
function startGame() {
	//reset guesses to 0
	numGuesses = 0;
	// solution is chosen randomly from wordList
	chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
	// the word is broken into individual letters
	lettersInChosenWord = chosenWord.split("");
	// we count the number of letters in the word
	numBlanks = lettersInChosenWord.length;
	// We print the solution in console (for testing)
	console.log(chosenWord);
	 // CRITICAL LINE - here we *reset* the guess and success array at each round
	 blanksAndSuccesses = [];
	 // CRITICAL LINE - here we *reset* the wrong guesses from the previous round
	 wrongGuesses = [];
	 // Fill up the blanksAndSuccesses list with appropriate number of blanks. This is based on number of letters in solution
	 for (var i=0; i <numBlanks; i++){
		blanksAndSuccesses.push("_");
}

	// print the initial blanks in console
	console.log(blanksAndSuccesses);

	// Reprints the guessesLeft to 9
	document.getElementById("guessesLeft").innerHTML = numGuesses;

	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");

	// Clears the wrong guesses from the previous round
	document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ");
}

// checkLetters() function
// It's where we will do all of the comparisons for matches.
	function checkLetters(letter) {

		// this boolean will be toggled based on whether or not a user letter is found anywhere in the word
		var letterInWord = false;

		// Check if a leter exists inside the array at all
		for (var i=0; i<numBlanks; i++) {
		if(chosenWord[i] == letter) {
			letterInWord = true; // if the letter exists then toggle this boolean to true
		}
	}

		// If the letter exists somewhere in the word, then figure out exactly where (which indices)
		if(letterInWord){
			// loop through the word 
			for (var i=0; i<numBlanks; i++){

				// Populate the blanksAndSuccesses with every instance of the letter.
				if(chosenWord[i] == letter) {
				blanksAndSuccesses[i] = letter; // here set the specific space in blanks and letter equal to the letter when there is a match
				}
		}
		console.log(blanksAndSuccesses); // logging for testing
	}
	// If the letter doesn't exist at all
	else {
		wrongGuesses.push(letter); // then add the letter to the list of wrong letters
		numGuesses--; // and subtract one of the guesses
		}
}

// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete(){

	// First, log an initial status update in the console telling us how many wins, losses, and guesses are left
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

	// Update the HTML to reflect the new number of guesses. Also update the correct guesses.
	document.getElementById("guessesLeft").innerHTML= numGuesses;
	document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" "); // This will print the array of guesses and blanks onto the page
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" "); // this will print the wrong guesses onto the page.

	// If all the letters match the solution...
	if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()) {
		winCounter++; // add to the win counter 
		alert("You win!"); // give the user an alert

		// Update the win counter in the HTML
		document.getElementById("winCounter").innerHTML= winCounter;
		// restart the game 
		startGame(); 
	}

	// If we've run out of guesses
	else if(numGuesses == 0) {
		lossCounter++; 	 // add to the loss counter 
		alert("Sorry, try again?"); // give the user an alert

		// Update the loss counter in the HTML
		document.getElementById("lossCounter").innerHTML= lossCounter; 
		// restart the game
		startGame(); 
	}

}

// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)

// Starts the Game by running the startGame() function
	startGame();

	// Then initiates the function for capturing key clicks.
	document.onkeyup = function(event) {
		letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); // converts all key clicks to lowercase lettesr
	
	checkLetters(letterGuessed); // runs the code to check for correctness 
	roundComplete(); // runs the code after each round is done
}
