import GlobalVariables from "../store/globalVariables.js";
import { createRepeatCategoryBtn } from "./createRepeatCategoryButton.js";

export function updateCategoryStatus(category, categoryNode) {

    category = category || GlobalVariables.currentCategory;
    categoryNode = categoryNode || GlobalVariables.currentCategoryNode;
    console.log(category);

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
        categoryNode.querySelector('.category-picture').classList.add('unvisited-category');
        categoryNode.querySelector('.category-stat').innerText = '';
        if (categoryNode.querySelector('.repeat-category-btn')) {
            categoryNode.querySelector('.repeat-category-btn').remove();

        }
    } else {
        const amountOfCorrectAnswers = currentCategory.questions.filter(question => question === true);
        categoryNode.querySelector('.category-stat').innerText = `${amountOfCorrectAnswers.length}/${category.amountOfQuestions}`;
        if (currentCategory.questions.length === category.amountOfQuestions) {
            if (!categoryNode.querySelector('.repeat-category-btn')) {
                categoryNode.append(createRepeatCategoryBtn(category, categoryNode));
            }
        }
    }
};