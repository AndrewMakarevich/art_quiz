export function createNavButton(hash, text, location) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.classList.add(`route-btn`);
    button.classList.add(`route-btn__${text.toLowerCase()}`);
    button.dataset.route = location;
    button.innerText = text;

    if (hash === location) {
        button.classList.add(`active-route-btn`);
    }

    button.onclick = () => {
        window.location.hash = location;
    };

    li.append(button);
    return li;
}