import { createQuizModal } from './createQuizModal.js';
import { token } from '../store/accessToken.js';

export { createQuizModal } from './createQuizModal.js';
export async function createCategory(category, authorName, repName, path, branchName) {
    const host = axios.create({
        baseURL: 'https://api.github.com'
    });
    const authInterceptor = (config) => {
        config.headers.authorization = `token  ${token}`;
        return config;
    };
    host.interceptors.request.use(authInterceptor);
    const { data } = await host.get(`/repos/${authorName}/${repName}/contents/${path}/${category.categoryPicture}.jpg?ref=${branchName}`);

    const categoryWrapper = document.createElement('article');
    categoryWrapper.classList.add('category-wrapper');

    const categoryHeaderWrapper = document.createElement('div');


    const categoryHeader = document.createElement('h3');
    categoryHeader.classList.add('category-header');
    categoryHeader.innerText = category.categoryName;

    const categoryPicture = document.createElement('img');
    categoryPicture.alt = `category ${category.categoryName} picture`;
    categoryPicture.src = data.download_url;
    categoryPicture.classList.add('category-picture');

    categoryHeaderWrapper.append(categoryHeader);
    categoryWrapper.append(categoryHeaderWrapper);
    categoryWrapper.append(categoryPicture);

    const categoryBtn = document.createElement('button');
    categoryBtn.classList.add('open-category-quiz-btn');

    let categoryResStorage = localStorage.getItem('categoryQuizStorage');
    if (!categoryResStorage) {
        localStorage.setItem('categoryQuizStorage', '{}');
    }
    categoryResStorage = JSON.parse(localStorage.getItem('categoryQuizStorage'));
    let currentType = categoryResStorage[window.location.hash.split('#/')[1]];
    if (!currentType) {
        categoryResStorage[window.location.hash.split('#/')[1]] = {};
        currentType = categoryResStorage[window.location.hash.split('#/')[1]];
    }
    let currentCategory = currentType[category.categoryName];
    if (!currentCategory) {
        categoryPicture.classList.add('unvisited-category');
    }

    categoryBtn.addEventListener('click', () => {
        createQuizModal(category, categoryPicture);
    });

    categoryWrapper.append(categoryBtn);

    return categoryWrapper;
}