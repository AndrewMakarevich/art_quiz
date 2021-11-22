export class GlobalVariables {
    constructor() {
        this._quizModalExistence = false;
        this._correctAnswerModalExistence = false;
        this._currentCategory;
        this._currentCategoryNode;
        this._timerOptions = {
            enabled: true,
            time: 20,
            maxTime: 60,
            minTime: 10
        };
        this._audioOptions = {
            volume: 50
        };
    }
    get quizModalExistence() {
        return this._quizModalExistence;
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
    get timerOptions() {
        return this._timerOptions;
    }
    get audioOptions() {
        return this._audioOptions;
    }

    set quizModalExistence(bool) {
        this._quizModalExistence = bool;
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
    set timerOptions(options) {
        this._timerOptions = options;
    }
    set audioOptions(option) {
        this._audioOptions = option;
    }
}
export default new GlobalVariables();