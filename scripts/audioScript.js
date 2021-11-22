import GlobalVariables from "../store/globalVariables.js";

function saveAudioSettings() {
    const timerOptions = GlobalVariables.timerOptions;
    let settingsStorage = localStorage.getItem('settings');
    if (!settingsStorage) {
        localStorage.setItem('settings', '{}');
        settingsStorage = JSON.parse(localStorage.getItem('settings'));
    } else {
        // console.log(settingsStorage);
        settingsStorage = JSON.parse(localStorage.getItem('settings'));
    }
    const audioSettings = settingsStorage['audio'];
    if (!audioSettings) {
        settingsStorage['audio'] = {
            volume: 50
        };
        localStorage.setItem('settings', JSON.stringify(settingsStorage));
    } else {
        GlobalVariables.audioOptions = audioSettings;
    }
    const valueLine = document.querySelector('.volume-input');
    valueLine.max = 1;
    valueLine.value = GlobalVariables.audioOptions.volume;

    valueLine.onchange = () => {
        console.log(valueLine.value);
        audioSettings.volume = +valueLine.value;
        localStorage.setItem('settings', JSON.stringify(settingsStorage));
        GlobalVariables.audioOptions = audioSettings;
    };
}
saveAudioSettings();

export function clickSound() {
    const clickAudio = document.querySelector('.click-audio');
    clickAudio.volume = GlobalVariables.audioOptions.volume;
    clickAudio.play();
}
export function loseSound() {
    const loseAudio = document.querySelector('.lose-audio');
    clickAudio.volume = GlobalVariables.audioOptions.volume;
    loseAudio.play();
}
export function victorySound() {
    const victoryAudio = document.querySelector('.victory-audio');
    clickAudio.volume = GlobalVariables.audioOptions.volume;
    victoryAudio.play();
}