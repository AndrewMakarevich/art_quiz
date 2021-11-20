/*jshint esversion:8*/
import { getTinyArtsFromRepos } from './getTinyArtsFromRepos.js';
import { checkAnswer } from './checkAnswer.js';
import { GlobalVariables } from '../store/globalVariables.js';
export function createQuestionForm(objsToCreateQuestion, correctAnswerObj, questionObj, categoryName) {

    const storage = JSON.parse(localStorage.getItem('categoryQuizStorage'));
    const currentSection = storage[window.location.hash.split('#/')[1]];
    const currentCategory = currentSection[categoryName];
    const categoryQuestionsResult = currentCategory.questions;
    if (categoryQuestionsResult.length === 10) {
        return document.querySelector('.question-form').innerHTML = `
        <h5>You answered all the questions.</h5>`;
    }

    if (document.querySelector('.question-form')) {
        document.querySelector('.question-form').innerHTML = '';
    }

    const question = document.createElement('h5');
    question.classList.add('question-text');
    let questionText = questionObj.text;
    const textToChange = questionObj.text.match(/(?<=<)\w{1,}(?=>)/g);
    if (textToChange) {
        textToChange.forEach(text => {
            console.log(correctAnswerObj[text]);
            questionText = questionText.replace(`<${text}>`, correctAnswerObj[text]);
        });
    }
    question.innerText = questionText;

    const imagesWrapper = document.createElement('section');
    imagesWrapper.classList.add('question-form-img-wrapper');
    async function createQuestionImage(obj) {
        const img = document.createElement('img');
        img.classList.add('question-img');
        const imgUrl = await getTinyArtsFromRepos('AndrewMakarevich', 'image-data', 'img', 'master', obj.imageNum);
        img.src = imgUrl;
        imagesWrapper.append(img);
    }
    if (questionObj.amountOfPictures === 0) {

    }
    else if (questionObj.amountOfPictures === 1) {
        createQuestionImage(correctAnswerObj);
    } else {
        objsToCreateQuestion.forEach((obj) => {
            createQuestionImage(obj);
        });
    }



    async function createAnswerOption(possibleAnswerObj) {
        if (questionObj.answerOptionsType === 'text') {
            const answerButton = document.createElement('button');
            answerButton.classList.add('answer-button');
            answerButton.innerText = possibleAnswerObj[questionObj.answerOptionsProp];
            answerButton.addEventListener('click', () => {
                if (!GlobalVariables.correctAnswerModalExistence) {
                    checkAnswer(answerButton, correctAnswerObj, questionObj, categoryName);
                }
            });
            return answerButton;
        } else if (questionObj.answerOptionsType === 'picture') {

            const answerImageWrapper = document.createElement('article');
            answerImageWrapper.classList.add('answer-image-wrapper');

            const answerImg = document.createElement('img');
            answerImg.classList.add('answer-img');

            const answerImgButton = document.createElement('button');
            answerImgButton.classList.add('answer-button');
            answerImgButton.classList.add('image-btn');

            answerImgButton.addEventListener('click', () => {
                if (!GlobalVariables.correctAnswerModalExistence) {
                    checkAnswer(answerButton, correctAnswerObj, questionObj, categoryName);
                }
            });

            const imgUrl = await getTinyArtsFromRepos('AndrewMakarevich', 'image-data', 'img', 'master', possibleAnswerObj.imageNum);
            answerImg.src = imgUrl;

            answerImageWrapper.append(answerImg);
            answerImageWrapper.append(answerImgButton);
            return answerImageWrapper;
        }
    }

    const answerOptionsWrapper = document.createElement('section');
    answerOptionsWrapper.classList.add('answer-options');

    objsToCreateQuestion.forEach((obj) => {
        createAnswerOption(obj).then(answerOption => answerOptionsWrapper.append(answerOption));
    });


    const questionForm = document.querySelector('.question-form');
    questionForm.append(question);
    questionForm.append(imagesWrapper);
    return questionForm.append(answerOptionsWrapper);
}