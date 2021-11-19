/*jshint esversion:6*/
import { generateQuestion } from "./generateQuestion.js";
export function createQuizModal(category, categoryPicture) {

    const main = document.querySelector('main');

    if (document.querySelector('.category-quiz-wrapper')) {
        return;
    }

    const modalBackground = document.createElement('section');
    modalBackground.classList.add('category-quiz-wrapper');

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('category-quiz-window');

    const headerWrapper = document.createElement('section');
    headerWrapper.classList.add('category-quiz-header-wrapper');

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'close';
    closeBtn.addEventListener('click', () => {
        modalBackground.remove();
    });

    const currentCategoryHeader = document.createElement('h4');
    currentCategoryHeader.innerText = `Current category: ${category.categoryName}`;
    currentCategoryHeader.classList.add('category-quiz-header');

    headerWrapper.append(closeBtn);
    headerWrapper.append(currentCategoryHeader);

    modalWindow.append(headerWrapper);
    modalBackground.append(modalWindow);

    main.append(modalBackground);


    let categoryResStorage = JSON.parse(localStorage.getItem('categoryQuizStorage'));
    if (!categoryResStorage) {
        localStorage.setItem('categoryQuizStorage', '{}');
        categoryResStorage = JSON.parse(localStorage.getItem('categoryQuizStorage'));
    }
    let currentType = categoryResStorage[window.location.hash.split('#/')[1]];
    if (!currentType) {
        categoryResStorage[window.location.hash.split('#/')[1]] = {};
        currentType = categoryResStorage[window.location.hash.split('#/')[1]];
    }
    currentType[category.categoryName] = { questions: [] };

    categoryPicture.classList.remove('unvisited-category');

    localStorage.setItem('categoryQuizStorage', JSON.stringify(categoryResStorage));
    console.log(JSON.parse(localStorage.getItem('categoryQuizStorage')));


    generateQuestion('AndrewMakarevich', 'image-data', '.', 'master', 'images.json');
}