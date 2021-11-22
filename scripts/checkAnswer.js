/*jshint esversion:6*/

import { createCorrectAnswerModal } from "./createCorrectAnswerModal.js";
import GlobalVariables from "../store/globalVariables.js";
import { loseSound, victorySound } from "./audioScript.js";

export function checkAnswer(btn, correctAnswerObj, questionObj) {
    if (!btn) {
        createCorrectAnswerModal(correctAnswerObj, GlobalVariables.currentCategory.categoryName, false).then(obj => document.querySelector('.question-form').append(obj));
        return false;
    }
    const storage = JSON.parse(localStorage.getItem('categoryQuizStorage'));
    const currentSection = storage[window.location.hash.split('#/')[1]];
    const currentCategory = currentSection[GlobalVariables.currentCategory.categoryName];

    let categoryQuestionsResult = currentCategory.questions;

    const answer = btn.innerText;
    const correctAnswer = correctAnswerObj[questionObj.answerOptionsProp];
    if (answer.toLowerCase().split(' ').join('') === correctAnswer.toLowerCase().split(' ').join('')) {
        categoryQuestionsResult.push(true);
        localStorage.setItem('categoryQuizStorage', JSON.stringify(storage));
        console.log(JSON.parse(localStorage.getItem('categoryQuizStorage')));
        createCorrectAnswerModal(correctAnswerObj, GlobalVariables.currentCategory.categoryName, true).then(obj => document.querySelector('.question-form').append(obj));
        victorySound();
        return true;
    }
    categoryQuestionsResult.push(false);
    localStorage.setItem('categoryQuizStorage', JSON.stringify(storage));
    console.log(JSON.parse(localStorage.getItem('categoryQuizStorage')));
    createCorrectAnswerModal(correctAnswerObj, GlobalVariables.currentCategory.categoryName, false).then(obj => document.querySelector('.question-form').append(obj));
    loseSound();
    return false;

}