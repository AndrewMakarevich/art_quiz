import { createQuizModal } from './createQuizModal.js';
import { token } from '../store/accessToken.js';
import { updateCategoryStatus } from './updateCategoryStatus.js';
import GlobalVariables from '../store/globalVariables.js';

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
    categoryHeaderWrapper.classList.add('category-header-wrapper');

    const categoryHeader = document.createElement('h3');
    categoryHeader.classList.add('category-header');
    categoryHeader.innerText = category.categoryName;

    const categoryStat = document.createElement('article');
    categoryStat.classList.add('category-stat');

    const categoryPicture = document.createElement('img');
    categoryPicture.alt = `category ${category.categoryName} picture`;
    categoryPicture.src = data.download_url;
    categoryPicture.classList.add('category-picture');

    categoryHeaderWrapper.append(categoryHeader);
    categoryHeaderWrapper.append(categoryStat);
    categoryWrapper.append(categoryHeaderWrapper);
    categoryWrapper.append(categoryPicture);

    const categoryBtn = document.createElement('button');
    categoryBtn.classList.add('open-category-quiz-btn');



    categoryBtn.addEventListener('click', () => {
        createQuizModal(category, categoryPicture, categoryWrapper);
        GlobalVariables.currentCategoryNode = categoryWrapper;
    });

    categoryWrapper.append(categoryBtn);

    updateCategoryStatus(category, categoryWrapper);

    return categoryWrapper;
}