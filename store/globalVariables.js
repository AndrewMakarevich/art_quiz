export class GlobalVariables {
    constructor() {
        this._correctAnswerModalExistence = false;
        this._currentCategory;
        this._currentCategoryNode;
    }
    get correctAnswerModalExistence() {
        return this._correctAnswerModalExistence;
    }
    get currentCategory() {
        return this._currentCategory;
    }
    get currentCategoryNode() {
        return this._currentCategoryNode;
    }
    set correctAnswerModalExistence(bool) {
        this._correctAnswerModalExistence = bool;
    }
    set currentCategory(category) {
        this._currentCategory = category;
    }
    set currentCategoryNode(node) {
        this._currentCategoryNode = node;
    }
}
export default new GlobalVariables();