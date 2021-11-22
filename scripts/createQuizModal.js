/*jshint esversion:6*/
import { generateQuestion } from "./generateQuestion.js";
import GlobalVariables from "../store/globalVariables.js";
import { updateCategoryStatus } from "./updateCategoryStatus.js";

export function createQuizModal(category, categoryPicture, categoryNode) {

    const main = document.querySelector('main');

    if (GlobalVariables.quizModalExistence) {
        return;
    }

    // Сохранение текущей категории в глобальной переменной
    GlobalVariables.currentCategory = category;
    GlobalVariables.quizModalExistence = true;

    const modalBackground = document.createElement('section');
    modalBackground.classList.add('category-quiz-wrapper');

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('category-quiz-window');

    const headerWrapper = document.createElement('section');
    headerWrapper.classList.add('category-quiz-header-wrapper');

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = `<svg class="close-icon" width="25" height="25" viewBox="0 0 36 36" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
        d="M20.113 17.9987L26.5567 11.569C26.8389 11.2868 26.9974 10.904 26.9974 10.5049C26.9974 10.1058 26.8389 9.723 26.5567 9.44077C26.2745 9.15855 25.8918 9 25.4928 9C25.0937 9 24.711 9.15855 24.4288 9.44077L18 15.8855L11.5712 9.44077C11.289 9.15855 10.9063 9 10.5072 9C10.1082 9 9.72545 9.15855 9.44327 9.44077C9.16109 9.723 9.00256 10.1058 9.00256 10.5049C9.00256 10.904 9.16109 11.2868 9.44327 11.569L15.887 17.9987L9.44327 24.4284C9.30281 24.5678 9.19133 24.7335 9.11525 24.9162C9.03917 25.0988 9 25.2947 9 25.4925C9 25.6904 9.03917 25.8863 9.11525 26.0689C9.19133 26.2516 9.30281 26.4173 9.44327 26.5567C9.58258 26.6971 9.74832 26.8086 9.93093 26.8847C10.1135 26.9608 10.3094 27 10.5072 27C10.7051 27 10.9009 26.9608 11.0835 26.8847C11.2662 26.8086 11.4319 26.6971 11.5712 26.5567L18 20.112L24.4288 26.5567C24.5681 26.6971 24.7338 26.8086 24.9165 26.8847C25.0991 26.9608 25.2949 27 25.4928 27C25.6906 27 25.8865 26.9608 26.0691 26.8847C26.2517 26.8086 26.4174 26.6971 26.5567 26.5567C26.6972 26.4173 26.8087 26.2516 26.8848 26.0689C26.9608 25.8863 27 25.6904 27 25.4925C27 25.2947 26.9608 25.0988 26.8848 24.9162C26.8087 24.7335 26.6972 24.5678 26.5567 24.4284L20.113 17.9987Z"
        fill="white" />
</svg>`;
    closeBtn.classList.add('close-quiz-btn');
    closeBtn.addEventListener('click', () => {
        modalBackground.remove();
        GlobalVariables.quizModalExistence = false;
    });

    const currentCategoryHeader = document.createElement('h4');
    currentCategoryHeader.innerText = `Current category: ${category.categoryName}`;
    currentCategoryHeader.classList.add('category-quiz-header');

    const questionForm = document.createElement('section');
    questionForm.classList.add('question-form');

    headerWrapper.append(closeBtn);
    headerWrapper.append(currentCategoryHeader);

    modalWindow.append(headerWrapper);
    modalWindow.append(questionForm);
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
    if (!currentType[category.categoryName]) {
        currentType[category.categoryName] = { questions: [] };
    }

    if (categoryPicture) {
        categoryPicture.classList.remove('unvisited-category');
    }
    localStorage.setItem('categoryQuizStorage', JSON.stringify(categoryResStorage));

    updateCategoryStatus(category, categoryNode);
    generateQuestion('AndrewMakarevich', 'image-data', '.', 'master', 'images.json');
}