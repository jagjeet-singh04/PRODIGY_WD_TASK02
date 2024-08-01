let startTime, updatedTime, difference, tInterval, savedTime = 0, running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1000);
        running = true;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.innerHTML = "00:00:00";
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    laps.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    difference = new Date(updatedTime);
    display.innerHTML = (difference.getUTCHours() < 10 ? '0' : '') + difference.getUTCHours() + ':' + 
                        (difference.getUTCMinutes() < 10 ? '0' : '') + difference.getUTCMinutes() + ':' + 
                        (difference.getUTCSeconds() < 10 ? '0' : '') + difference.getUTCSeconds();
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.innerText = display.innerHTML;
        laps.appendChild(lapTime);
    }
}
