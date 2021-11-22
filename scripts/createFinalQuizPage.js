/*jshint esversion:6*/

import GlobalVariables from "../store/globalVariables.js";
import { createQuizModal } from "./createQuizModal.js";
import { updateCategoryStatus } from "./updateCategoryStatus.js";
import categoriesStore from "../store/categoriesStore.js";
import { moveToTheNextCategory } from "./moveToTheNextCategory.js";

export function createFinalQuizPage(answersArray) {
    let currentCategoryNode = GlobalVariables.currentCategoryNode;
    let currentCategory = GlobalVariables.currentCategory;
    const correctAnswersArray = answersArray.filter(answer => answer === true);

    const finalQuizPageWrapper = document.createElement('section');
    finalQuizPageWrapper.classList.add('final-quiz-page');

    const finalQuizPageIcon = document.createElement('img');
    finalQuizPageIcon.classList.add('final-quiz-page-icon');

    const finalQuizPageCongrat = document.createElement('h6');
    finalQuizPageCongrat.classList.add('final-quiz-page-congrat');

    const finalQuizPageResult = document.createElement('h6');
    finalQuizPageResult.classList.add('final-quiz-page-result');

    const finalQuizPageBtnWrapper = document.createElement('section');
    finalQuizPageBtnWrapper.classList.add('final-quiz-page-btn-wrapper');

    const firstFinalQuizBtn = document.createElement('button');
    firstFinalQuizBtn.classList.add('final-quiz-btn');

    const secondFinalQuizBtn = document.createElement('button');
    secondFinalQuizBtn.classList.add('final-quiz-btn');

    const correctPercent = (correctAnswersArray.length / currentCategory.amountOfQuestions) * 100;

    if (correctPercent <= 60) {
        finalQuizPageIcon.src = '../assets/svg/bad-result-icon.svg';
        finalQuizPageIcon.alt = 'Bad result icon';
        finalQuizPageCongrat.innerText = 'Game Over';
        finalQuizPageResult.innerText = `${correctAnswersArray.length}/${currentCategory.amountOfQuestions}\n Play again?`;

        firstFinalQuizBtn.innerText = 'No';
        firstFinalQuizBtn.addEventListener('click', () => {
            document.querySelector('.category-quiz-wrapper').remove();
        });

        secondFinalQuizBtn.innerText = 'Yes';
        secondFinalQuizBtn.addEventListener('click', () => {
            const storage = JSON.parse(localStorage.getItem('categoryQuizStorage'));
            const currentSection = storage[window.location.hash.split('#/')[1]];
            delete currentSection[currentCategory.categoryName];
            localStorage.setItem('categoryQuizStorage', JSON.stringify(storage));
            document.querySelector('.category-quiz-wrapper').remove();
            updateCategoryStatus();
            createQuizModal(currentCategory, currentCategoryNode.querySelector('.category-picture'), currentCategoryNode);
        });


    } else if (correctPercent === 100) {
        finalQuizPageIcon.src = '../assets/svg/champion-result-icon.svg';
        finalQuizPageIcon.alt = 'Champion result icon';
        finalQuizPageCongrat.innerText = 'Grand Result';
        finalQuizPageResult.innerText = 'Congratulations!';

        firstFinalQuizBtn.classList.add('hide-btn');

        secondFinalQuizBtn.innerText = 'Next';
        secondFinalQuizBtn.addEventListener('click', () => {
            moveToTheNextCategory();
        });
    } else {
        finalQuizPageIcon.src = '../assets/svg/good-result-icon.svg';
        finalQuizPageIcon.alt = 'Good result icon';
        finalQuizPageCongrat.innerText = 'Congratulations!';
        finalQuizPageResult.innerText = `${correctAnswersArray.length}/${currentCategory.amountOfQuestions}`;

        firstFinalQuizBtn.innerText = 'Home';
        secondFinalQuizBtn.innerText = 'Next Quiz';

        firstFinalQuizBtn.addEventListener('click', () => {
            document.querySelector('.category-quiz-wrapper').remove();
        });
        secondFinalQuizBtn.addEventListener('click', () => {
            moveToTheNextCategory();
        });
    }



    finalQuizPageBtnWrapper.append(firstFinalQuizBtn);
    finalQuizPageBtnWrapper.append(secondFinalQuizBtn);

    finalQuizPageWrapper.append(finalQuizPageIcon);
    finalQuizPageWrapper.append(finalQuizPageCongrat);
    finalQuizPageWrapper.append(finalQuizPageResult);
    finalQuizPageWrapper.append(finalQuizPageBtnWrapper);

    return finalQuizPageWrapper;
}