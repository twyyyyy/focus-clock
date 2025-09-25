let time = 25 * 60; // minutes * seconds 
let mode = "focus"; // keeps track of whether youre in focus/break mode 
let timer = null; // a variable that stores the ID number returned by setInterval()

// UPDATES THE COUNTDOWN ON SCREEN
function updateDisplay(){
    let minutes = Math.floor(time/60);
    let seconds = time%60; 
    let formatted = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}` // convert to mm:ss format 
    document.getElementById("countdown").textContent = formatted;
}

// START OR PAUSE TIMER 
function startorPauseTimer(){ // function is designed to handle both start and pause
    // PAUSE
    if (timer){
        clearInterval(timer);
        timer = null;
        document.getElementById("btnStart").textContent = "RESUME";
    }
    // START 
    else{
        timer = setInterval(tick,1000);
        document.getElementById("btnStart").textContent = "PAUSE";
    }
}

// SWITCH BETWEEN FOCUS/BREAK MODE
function setMode(newMode){
    if (timer){
        clearInterval(timer);
        timer = null;
    }
    mode = newMode; 
    time = (mode === "focus" ? 25 : 5) * 60; // focus = 25, break = 5 
    updateDisplay();
    document.getElementById("btnStart").textContent = "START"; // when switching to a new state, reset the button to its original state
}

// THE HEART OF THE COUNTDOWN -> runs every second because of the setInterval()
function tick(){
    time--;
    updateDisplay(); 
    if (time <= 0){ // stop timer if countdown has reached zero 
        clearInterval(timer); // stops the repeating setInterval() that was calling tick() every second 
        timer = null; // rests the timer variable to null -> no timer is running now 
        document.getElementById("btnStart").textContent = "START"; // sets button back to "START" so user knows they can start the timer again 
    }
}