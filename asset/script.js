const hrsInput = document.getElementById('hrs');
const minInput = document.getElementById('min');
const secInput = document.getElementById('sec');
const startPauseBtn = document.getElementById('start-pause');
const resetBtn = document.getElementById('reset');

let isRunning = false;
let timerId = null;


function checkInputs() {
    const total = parseInt(hrsInput.value || 0) + 
                  parseInt(minInput.value || 0) + 
                  parseInt(secInput.value || 0);
    
    if (total > 0) {
        startPauseBtn.classList.add('enabled');
        startPauseBtn.disabled = false;
        resetBtn.classList.add('enabled');
        resetBtn.disabled = false;
    } else {
        startPauseBtn.classList.remove('enabled');
        startPauseBtn.disabled = true;
        resetBtn.classList.remove('enabled');
        resetBtn.disabled = true;
    }
}

[hrsInput, minInput, secInput].forEach(input => {
    input.addEventListener('input', checkInputs);
});

function toggleTimer() {
    if (!isRunning) {
        // START 동작
        startTimer();
        startPauseBtn.innerHTML = `<span>||</span> PAUSE`;
        startPauseBtn.classList.add('is-pausing');
    } else {
        pauseTimer();
        startPauseBtn.innerHTML = `<span>▶</span> START`;
        startPauseBtn.classList.remove('is-pausing');
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerId);
}

function startTimer() {
    isRunning = true;
    let totalSeconds = 
        parseInt(hrsInput.value || 0) * 3600 + 
        parseInt(minInput.value || 0) * 60 + 
        parseInt(secInput.value || 0);

    if (timerId) clearInterval(timerId);

    timerId = setInterval(() => {
        totalSeconds--;
        updateDisplay(totalSeconds);

        if (totalSeconds <= 0) {
            resetTimer();
            alert("Finish!");
        }
    }, 1000);
}

function updateDisplay(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hrsInput.value = String(h).padStart(2, '0');
    minInput.value = String(m).padStart(2, '0');
    secInput.value = String(s).padStart(2, '0');
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    hrsInput.value = '00';
    minInput.value = '00';
    secInput.value = '00';
    startPauseBtn.innerHTML = `<span>▶</span> START`;
    startPauseBtn.classList.remove('is-pausing');
    checkInputs();
}

startPauseBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

checkInputs();