window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script3 = function()
{
  // Retrieve the current value of rdm_var (a comma-separated string of used numbers)
var usedNumbers = player.GetVar("rdm_var");

// If rdm_var is empty, initialize it as an empty string
if (usedNumbers === "") {
    usedNumbers = [];  // Initialize as an empty array
} else {
    // Split the string into an array of used numbers
    usedNumbers = usedNumbers.split(",").map(Number);  // Convert each value to a number
}

// Function to generate a unique random number between 1 and 18
function getUniqueRandomNumber() {
    var randomNumber;
    var attempts = 0;

    // Loop to generate a unique random number until it hasn't been used
    do {
        randomNumber = Math.floor(Math.random() * 18) + 1;
        attempts++;

        // If we've tried 18 times and couldn't find a unique number, return null (all numbers used)
        if (attempts > 18) {
            return null;  // All numbers have been used
        }
    } while (usedNumbers.indexOf(randomNumber) !== -1);  // Check if the number has been used

    return randomNumber; // Return the unique random number
}

// Get a unique random number
var uniqueRandomNumber = getUniqueRandomNumber();

// If we found a valid unique random number, update rdm_var and set Peachdial
if (uniqueRandomNumber !== null) {
    // Append the new random number to the array of used numbers
    usedNumbers.push(uniqueRandomNumber);

    // Update rdm_var with the new list of used numbers (as a comma-separated string)
    player.SetVar("rdm_var", usedNumbers.join(","));

    // Set Peachdial to the most recent random number
    player.SetVar("Peachdial", uniqueRandomNumber);
} else {
    // All numbers from 1 to 18 have been used, so reset rdm_var and Peachdial
    player.SetVar("rdm_var", "");
    player.SetVar("Peachdial", "");
}
}

};
