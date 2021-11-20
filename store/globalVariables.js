export class GlobalVariables {
    constructor() {
        this._correctAnswerModalExistence = false;
    }
    get correctAnswerModalExistence() {
        return this._correctAnswerModalExistence;
    }
    set correctAnswerModalExistence(bool) {
        this._correctAnswerModalExistence = bool;
    }
}