function openCloseSettings() {
    const settingsSection = document.querySelector('.settings-section');
    const closeBtn = settingsSection.querySelector('.close-btn');
    const openBtn = document.querySelector('.settings-btn');
    openBtn.addEventListener('click', () => {
        settingsSection.classList.remove('unactive');
        settingsSection.classList.add('active');
    });
    closeBtn.addEventListener('click', () => {
        settingsSection.classList.add('unactive');
        settingsSection.classList.remove('active');
    });
}
openCloseSettings();