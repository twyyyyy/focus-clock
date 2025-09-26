let time = 25 * 60; // minutes * seconds 
let mode = "focus"; // keeps track of whether youre in focus/break mode 
let timer = null; // a variable that stores the ID number returned by setInterval()
let totalSession = time; // keeps track of how long the current session is supposed to last (in seconds)

// UPDATES THE COUNTDOWN ON SCREEN
function updateDisplay(){
    let minutes = Math.floor(time/60);
    let seconds = time%60; 
    let formatted = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}` // convert to mm:ss format 
    document.getElementById("countdown").textContent = formatted;
}

// START OR PAUSE TIMER 
function startorPauseTimer(){ // function is designed to handle both start and pause

    // RESET
    if (!timer && time <= 0) { // if timer is not running AND countdown has already reached 0
        reset();
    }

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
    let focusInput = document.getElementById('focusInput').value;
    let breakInput = document.getElementById('breakInput').value;

    let focusLength = parseInt(focusInput) || 25; // fallback to 25 if input is invalid
    let breakLength = parseInt(breakInput) || 5;   // fallback to 5 if input is invalid

    if (timer){ // if timer is running, stop so we can switch modes 
        clearInterval(timer);
        timer = null;
    }
    mode = newMode; 
    time = (mode === "focus" ? focusLength : breakLength) * 60; // focus = 25, break = 5 
    totalSession = time; // update new duration 

    reset(); // reset progress bar + countdown display 
    document.getElementById("btnStart").textContent = "START"; // when switching to a new state, reset the button to its original state
}

// THE HEART OF THE COUNTDOWN -> runs every second because of the setInterval()
function tick(){
    if (time > 0){ // prevents negative values 
        time--;
    }
    updateDisplay(); 

    // update progress bar to reflect remaining time 
    let progressUpdate = document.getElementById('progress');
    progressUpdate.value = totalSession - time; 

    if (time === 0){ // stop timer if countdown has reached zero 
        clearInterval(timer); // stops the repeating setInterval() that was calling tick() every second 
        timer = null; // rests the timer variable to null -> no timer is running now 
        document.getElementById("btnStart").textContent = "START"; // sets button back to "START" so user knows they can start the timer again 
        
        // play alert sound 
        let sound = document.getElementById("alarm"); 
        sound.play();

        reset(); // reset timer + progress bar back to session's full duration
    }
}

// TIMER/PROGRESS BAR RESET 
function reset(){
    let progressUpdate = document.getElementById('progress');
    time = totalSession; 
    progressUpdate.max = totalSession; // sets progress bar's max value to match session's total duration 
    progressUpdate.value = 0; // empty bar so it is ready to fil up in the next session 
    updateDisplay(); 
}

// VOLUME VARIABLES 
let volumeSlider = document.getElementById('volume');
let alarm = document.getElementById('alarm');

// CUSTOM VOLUME 
function updateVolume(){
    let volumeValue = volumeSlider.value; 
    alarm.volume = volumeValue / 10; // audio volume property value ranges from 0.0 to 1.0
}
volumeSlider.addEventListener('input', updateVolume);

// OVERLAY + SETTINGS DIALOG VARIABLES 
let dlg = document.getElementById('settingsDlg');
let overlay = document.getElementById('settings-overlay');
let settingsBtn = document.getElementById('settingsBtn');
let closeBtn = document.getElementById('closeDlg');

// OPEN DIALOG BOX 
function openDialog() {
    overlay.style.display = "block";
    dlg.showModal();
}
settingsBtn.addEventListener('click', openDialog);

// SAVES CUSTOM DURATION AND CLOSES DIALOG BOX 
function closeDialog() {
  dlg.close(); 
  setMode(mode);
}
closeBtn.addEventListener('click', closeDialog);

// HIDES OVERLAY WHEN ESC IS CLICKED 
function hideOverlay(){
    overlay.style.display = 'none';
}
dlg.addEventListener('close',hideOverlay);