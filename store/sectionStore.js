class sectionStore {
    constructor() {
        this._sections = [
            {
                id: 0,
                section: 'authors',
                questions: [
                    {
                        text: "Who is the author of this picture?",
                        amountOfPictures: 1
                    }
                ]
            },
            {
                id: 1,
                section: 'pictures',
                questions: [
                    {
                        text: "Which picture was written by <authorName>?",
                        amountOfPictures: 4
                    }
                ]
            }
        ];
    }

}