class SectionStore {
    constructor() {
        this._sections = [
            {
                id: 0,
                section: 'authors',
                questions: [
                    {
                        text: "Who is the author of this picture?",
                        amountOfAnswerOptions: 4,
                        answerOptionsType: 'text',
                        answerOptionsProp: 'author',
                        amountOfPictures: 1
                    }
                ]
            },
            {
                id: 1,
                section: 'pictures',
                questions: [
                    {
                        text: "Which picture was written by <author>?",
                        amountOfAnswerOptions: 4,
                        answerOptionsType: 'picture',
                        answerOptionsProp: 'imageNum',
                        amountOfPictures: 0
                    }
                ]
            }
        ];
    }
    getSections() {
        return this._sections;
    }

}
export default new SectionStore();