import GlobalVariables from "../store/globalVariables.js";
import { checkAnswer } from "./checkAnswer.js";

export function setTimer(correctAnswerObj, questionObj) {
    const time = GlobalVariables.timerOptions.time;
    let timeLeft = time;
    const timerNode = createTimer();
    document.querySelector('.timer-block').append(timerNode);
    const timer = setInterval(() => {
        if (GlobalVariables.correctAnswerModalExistence || !GlobalVariables.quizModalExistence) {
            return clearInterval(timer);
        }
        if (timeLeft === 0) {
            console.log('time left');
            clearInterval(timer);
            return checkAnswer(null, correctAnswerObj, questionObj);
        }

        timeLeft--;
        timerNode.querySelector('.timer-line').value = timeLeft;
        const minutes = `${Math.trunc(timeLeft / 60)}`.length === 1 ? `0${Math.trunc(timeLeft / 60)}` : `${Math.trunc(timeLeft / 60)}`;
        const seconds = `${timeLeft % 60}`.length === 1 ? `0${timeLeft % 60}` : `${timeLeft % 60}`;
        timerNode.querySelector('.time-left-block').innerText = `${minutes}:${seconds}`;
        console.log(timeLeft);
    }, 1000);
}
function createTimer() {
    const timerWrapper = document.createElement('article');
    timerWrapper.classList.add('timer-wrapper');
    const timerLine = document.createElement('input');
    timerLine.classList.add('timer-line');
    timerLine.type = 'range';
    timerLine.disabled = true;
    timerLine.max = GlobalVariables.timerOptions.time;
    timerLine.value = GlobalVariables.timerOptions.time;
    const timeLeftBlock = document.createElement('div');
    timeLeftBlock.classList.add('time-left-block');

    timerWrapper.append(timerLine);
    timerWrapper.append(timeLeftBlock);
    return timerWrapper;
}
function timerTimeChange() {
    let settingsStorage = JSON.parse(localStorage.getItem('settings'));
    let timerSettings = settingsStorage['timer'];
    console.log(settingsStorage);
    const decreaseBtn = document.querySelector('.time-game-timer .decrease-btn');
    const encreaseBtn = document.querySelector('.time-game-timer .encrease-btn');
    decreaseBtn.addEventListener('click', () => {
        if (timerSettings['time'] - 1 >= GlobalVariables.timerOptions.minTime) {
            timerSettings['time'] = timerSettings['time'] - 1;
            localStorage.setItem('settings', JSON.stringify(settingsStorage));
            GlobalVariables.timerOptions = timerSettings;
            const currentTimeBlock = document.querySelector('.current-time-block');
            currentTimeBlock.innerText = GlobalVariables.timerOptions.time;
            console.log(JSON.parse(localStorage.getItem('settings')));
        }
    });
    encreaseBtn.addEventListener('click', () => {
        if (timerSettings['time'] + 1 <= GlobalVariables.timerOptions.maxTime) {
            timerSettings['time'] = +timerSettings['time'] + 1;
            localStorage.setItem('settings', JSON.stringify(settingsStorage));
            GlobalVariables.timerOptions = timerSettings;
            const currentTimeBlock = document.querySelector('.current-time-block');
            currentTimeBlock.innerText = GlobalVariables.timerOptions.time;
            console.log(JSON.parse(localStorage.getItem('settings')));
        }
    });
    // ON OFF TIMER
    const toggleTimer = document.querySelector('.time-game-toggle .toggle-wrapper .toggle-input');
    toggleTimer.addEventListener('click', () => {
        timerSettings['enabled'] = toggleTimer.checked;
        localStorage.setItem('settings', JSON.stringify(settingsStorage));
        GlobalVariables.timerOptions = timerSettings;
    });
}
function setTimerSettingsFromStorage() {
    const timerOptions = GlobalVariables.timerOptions;
    let settingsStorage = localStorage.getItem('settings');
    if (!settingsStorage) {
        localStorage.setItem('settings', '{}');
        settingsStorage = JSON.parse(localStorage.getItem('settings'));
    } else {
        // console.log(settingsStorage);
        settingsStorage = JSON.parse(localStorage.getItem('settings'));
    }
    const timerSettings = settingsStorage['timer'];
    if (!timerSettings) {
        settingsStorage['timer'] = {
            enabled: timerOptions.enabled,
            time: timerOptions.time,
            maxTime: timerOptions.maxTime,
            minTime: timerOptions.minTime
        };
        console.log(settingsStorage);
        localStorage.setItem('settings', JSON.stringify(settingsStorage));
    } else {
        GlobalVariables.timerOptions = timerSettings;
    }
    const currentTimeBlock = document.querySelector('.current-time-block');
    currentTimeBlock.innerText = GlobalVariables.timerOptions.time;
    const toggleTimer = document.querySelector('.time-game-toggle .toggle-wrapper .toggle-input');
    toggleTimer.checked = GlobalVariables.timerOptions.enabled;
}
setTimerSettingsFromStorage();
timerTimeChange();
