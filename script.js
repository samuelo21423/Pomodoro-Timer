let timeLeft = 1500;
let timerInterval; // ref to the setInterval function, needed later to clear interval
let isRunning = false; 

// Disable pause button on page load
document.getElementById("pause").disabled = true;

function updateTimer()
{
    let minutes = Math.floor(timeLeft/60); // Get full mins (timeleft in s, so /60 to get number of full mins)
    let seconds = timeLeft % 60; // Get remaining seconds (e.g. 90 % 60, 30 secs remaining)
    
    // Updating the text with the formatted timer value, leading 0
    // mins:ss
    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`; 

    // If time is less than 1 minute, update the color to red
    if(timeLeft < 60)
    {
        document.getElementById("timer").classList.add("critical")
    }

    else 
    {
        document.getElementById("timer").classList.remove("critical");
    }

    // If time reaches 0, stop timer and alert
    if(timeLeft <= 0)
    {
        clearInterval(timerInterval);
        alert("Time's up, take a break!");
    }

    else
    {
        timeLeft--;
    }
}

function startTimer()
{
    if(!isRunning) //if not already running (pmi)
    {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000) // Start the countdown + updates timer after every 1000ms/1s
        isRunning = true;

        // Enable pause button since the timer is running
        document.getElementById("pause").disabled = false;
    }
}

function stopTimer()
{
    clearInterval(timerInterval); // Stops countdown
    timerInterval = null; // clear intv. ref.
    timeLeft = 1500;
    isRunning = false;

    document.getElementById("pause").textContent = "Pause"; // Reset Pause button
    updateTimer(); //updates display to show reset timer
    document.getElementById("pause").disabled = true; // Disable the pause button since the timer is stoppe
}

function togglePause()
{
    let pauseButton = document.getElementById("pause");
    if(isRunning) //used isRunning flag
    {
        clearInterval(timerInterval); // Pauses Timer
        isRunning = false;
        pauseButton.textContent="Resume"; //Change text to resume
    }
    
    else
    {
        startTimer(); //resume
        pauseButton.textContent="Pause";
    }
}

// Wait for the HTML content to fully load before adding event listeners
document.addEventListener("DOMContentLoaded", function() 
{
    // Adds a click eventlistener to each button for their different timer functions
    document.getElementById("start").addEventListener("click", startTimer);
    document.getElementById("pause").addEventListener("click", togglePause);
    document.getElementById("stop").addEventListener("click", stopTimer);
});