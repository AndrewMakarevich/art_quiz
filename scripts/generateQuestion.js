/*jshint esversion:6*/

import { token } from "../store/accessToken.js";

export async function generateQuestion(authorName, repName, path, branchName, fileName) {
    const currentSection = window.location.hash.split('#/')[1];
    const host = axios.create({
        baseURL: 'https://api.github.com'
    });
    const authInterceptor = (config) => {
        config.headers.authorization = `token ${token}`;
        return config;
    };
    host.interceptors.request.use(authInterceptor);



    const { data } = await host.get(`repos/${authorName}/${repName}/contents/${path}/${fileName}?ref=${branchName}`);
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
    let dataContent = decodeURIComponent(escape(window.atob(data.content)));
    dataContent = JSON.parse(dataContent);
    console.log(dataContent);
}