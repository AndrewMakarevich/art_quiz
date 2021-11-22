import GlobalVariables from "../store/globalVariables.js";
import categoriesStore from "../store/categoriesStore.js";
import { createQuizModal } from "./createQuizModal.js";

export function moveToTheNextCategory() {
    document.querySelector('.category-quiz-wrapper').remove();
    GlobalVariables.quizModalExistence = false;
    let currentCategoryNode = GlobalVariables.currentCategoryNode;
    if (!currentCategoryNode.nextSibling) {
        GlobalVariables.currentCategoryNode = currentCategoryNode.parentNode.childNodes[1];
        console.log(currentCategoryNode.parentNode.childNodes[1]);
    } else {
        GlobalVariables.currentCategoryNode = currentCategoryNode.nextSibling;
    }

    currentCategoryNode = GlobalVariables.currentCategoryNode;
    let currentCategory;
    for (let category of categoriesStore.categories[window.location.hash.split('#/')[1]]) {
        if (category.id === +GlobalVariables.currentCategoryNode.id) {
            GlobalVariables.currentCategory = category;
            currentCategory = GlobalVariables.currentCategory;
            break;
        }
    }
    createQuizModal(currentCategory, currentCategoryNode.querySelector('.category-picture'), currentCategoryNode);
}