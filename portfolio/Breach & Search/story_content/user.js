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
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script4 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script5 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script6 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script7 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script8 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script9 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script10 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script11 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script12 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

window.Script13 = function()
{
  // Get the current Storyline player
var player = GetPlayer();

// Retrieve the stored timer value from the global variable (in seconds)
var storedTime = player.GetVar("timerStored");
if (storedTime === undefined || storedTime === null || storedTime === "") {
    storedTime = 600; // Default to 120 seconds (2 minutes) if no stored value
}

// Initialize the timer with the stored time value
var timerValue = storedTime; 

// Function to update the timer in Storyline and display in mm:ss format
function updateStorylineTimer() {
    // Calculate minutes and seconds
    var minutes = Math.floor(timerValue / 60); // Get minutes
    var seconds = timerValue % 60; // Get remaining seconds

    // Format seconds to always show 2 digits
    if (seconds < 10) {
        seconds = '0' + seconds; // Add leading zero for seconds if needed
    }

    // Create a formatted time string (mm:ss)
    var formattedTime = minutes + ':' + seconds;

    // Update the "timer" variable in Storyline with the formatted time
    player.SetVar("timer", formattedTime); 

    // Update the global variable with the current timer value (in seconds)
    player.SetVar("timerStored", timerValue);

    // If the timer reaches 0, stop the countdown
    if (timerValue <= 0) {
        clearInterval(timerInterval); // Stop the timer
    } else {
        timerValue--; // Decrement the timer by 1 second
    }
}

// Start the countdown after a slight delay to ensure proper initialization
var timerInterval;
setTimeout(function() {
    timerInterval = setInterval(updateStorylineTimer, 1000); // Start updating every second after 100ms delay
}, 100); // 100 milliseconds delay before starting the timer update



}

};
