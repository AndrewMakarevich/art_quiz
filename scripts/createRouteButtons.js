import router from '../routes/router.js';

export function createRouteButtons() {
    const wrapper = document.querySelector('.choose-section__wrapper');
    router.getRoutes().forEach(route => {
        const article = document.createElement('article');
        article.classList.add('choose-section__block');
        const button = document.createElement('button');
        button.classList.add('choose-section__btn');
        button.dataset.location = route.path;
        button.innerText = route.name;
        article.append(button);
        wrapper.append(article);
    });
}