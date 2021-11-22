/*jshint esversion:6*/

import { token } from "../store/accessToken.js";
import { getRndNumber } from "./rndBackground.js";
import ArtDataStore from '../store/artDataStore.js';
import SectionStore from "../store/sectionStore.js";
import { createQuestionForm } from "./createQuestionForm.js";


export async function generateQuestion(authorName, repName, path, branchName, fileName) {

    const host = axios.create({
        baseURL: 'https://api.github.com'
    });
    const authInterceptor = (config) => {
        config.headers.authorization = `token ${token}`;
        return config;
    };
    host.interceptors.request.use(authInterceptor);

    //Получение данный images.json и запись в хранилище, для дальнейшего использования и  избежания исполнения лишних запросов
    if (!ArtDataStore.getArtDatas()) {
        const { data } = await host.get(`repos/${authorName}/${repName}/contents/${path}/${fileName}?ref=${branchName}`);
        let dataContent = decodeURIComponent(escape(window.atob(data.content)));
        dataContent = JSON.parse(dataContent);
        ArtDataStore.setArtDatas(dataContent);
    }
    const artData = ArtDataStore.getArtDatas();

    // Получаем обьект вопроса

    const currentSection = window.location.hash.split('#/')[1];
    const sections = SectionStore.getSections();
    let sectionObj;
    for (let sectionKind of sections) {
        if (sectionKind.section === currentSection) {
            sectionObj = sectionKind;
            break;
        }
    }
    const questionType = sectionObj.questions[getRndNumber(0, sectionObj.questions.length - 1)];
    // console.log(questionType);



    // Создаю уникальную выборку обьектов, по имени автора.

    let objsToCreateQuestion = [];
    while (objsToCreateQuestion.length < questionType.amountOfAnswerOptions) {
        const rndNum = getRndNumber(0, 240);
        let objExistence = false;
        for (let value of objsToCreateQuestion) {
            if (value.author === artData[rndNum].author) {
                objExistence = true;
                break;
            }
        }
        if (!objExistence) {
            objsToCreateQuestion = [...objsToCreateQuestion, artData[rndNum]];
        }
    }
    // console.log(objsToCreateQuestion);

    // Выбор обьекта, который будет являться правильным ответом

    const correctAnswer = objsToCreateQuestion[getRndNumber(0, objsToCreateQuestion.length - 1)];
    // console.log(`Correct answer:`);
    // console.log(correctAnswer);

    createQuestionForm(objsToCreateQuestion, correctAnswer, questionType);

    // Костыльная попытка преобразования в обьект полученного содержимого файла images.js. Попытка неуспешна по причине вложенных кавычек, которые я не смог выудить с помощью регулярных выражений, 69 обьект, если быть точным, стал причиной провала.

    // const getObjsRegEx = /\{\n\s*[a-zA-Zа-яА-ЯёЁ0-9.«»'",:?\s-]{1,}\}/g;
    // const getPropRegEx = /\w{1,}(?=\:)/g;
    // let dataContent = decodeURIComponent(escape(window.atob(data.content)));
    // let propArray = new Set(dataContent.match(getPropRegEx));
    // for (let prop of propArray) {
    //     dataContent = dataContent.replaceAll(prop, `"${prop}"`);
    //     dataContent = dataContent.replaceAll("'", '"');
    //     dataContent = dataContent.replace(/\,(?=\s*})/g, '');
    // }
    // let objsArray = dataContent.match(getObjsRegEx);
    // objsArray = objsArray.map(obj => {
    //     try {
    //         console.log(JSON.parse(obj));
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // }
    // );
    // Создал аналог images.js в json формате и загрузил на gitHub

}

