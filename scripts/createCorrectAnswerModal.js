import { getTinyArtsFromRepos } from './getTinyArtsFromRepos.js';
import { generateQuestion } from './generateQuestion.js';
import GlobalVariables from '../store/globalVariables.js';

export async function createCorrectAnswerModal(correctAnswerObj, categoryName, answerResult) {


    const modalWindowBackground = document.createElement('div');
    modalWindowBackground.classList.add('correct-answer-modal-background');

    const modalWindow = document.createElement('section');
    modalWindow.classList.add('correct-answer-modal-window');

    const correctAnswerImg = document.createElement('img');
    correctAnswerImg.classList.add('correct-answer-img');
    correctAnswerImg.alt = 'Correct answer image';
    const imgUrl = await getTinyArtsFromRepos('AndrewMakarevich', 'image-data', 'img', 'master', correctAnswerObj.imageNum);
    correctAnswerImg.src = imgUrl;
    // console.log(imgUrl);

    const resultBlock = document.createElement('article');
    resultBlock.classList.add('correct-answer-result');
    if (answerResult) {
        resultBlock.classList.add('correct-answer');
    } else {
        resultBlock.classList.add('incorrect-answer');
    }


    const correctAnswerName = document.createElement('h6');
    correctAnswerName.classList.add('correct-answer-name');
    correctAnswerName.innerText = correctAnswerObj.name;

    const correctAnswerAuthorYear = document.createElement('h7');
    correctAnswerAuthorYear.classList.add('correct-answer-author-year');
    correctAnswerAuthorYear.innerText = `${correctAnswerObj.author}, ${correctAnswerObj.year}`;

    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.classList.add('next-question-btn');
    nextQuestionButton.innerText = 'Next';

    nextQuestionButton.addEventListener('click', () => {
        generateQuestion('AndrewMakarevich', 'image-data', '.', 'master', 'images.json', categoryName);
        modalWindowBackground.remove();
        GlobalVariables.correctAnswerModalExistence = false;
    });


    resultBlock.append(correctAnswerImg);
    modalWindow.append(resultBlock);
    modalWindow.append(correctAnswerName);
    modalWindow.append(correctAnswerAuthorYear);
    modalWindow.append(nextQuestionButton);

    modalWindowBackground.append(modalWindow);

    GlobalVariables.correctAnswerModalExistence = true;

    return modalWindowBackground;

}