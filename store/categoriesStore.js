class CategoriesStore {
    constructor() {
        this._categories = {
            authors: [
                {
                    id: 0,
                    categoryName: "Portrait",
                    categoryPicture: 109,
                    amountOfQuestions: 1
                },
                {
                    id: 1,
                    categoryName: "Landscape",
                    categoryPicture: 9,
                    amountOfQuestions: 10
                },
                {
                    id: 2,
                    categoryName: "Still life",
                    categoryPicture: 115,
                    amountOfQuestions: 10
                },
                {
                    id: 3,
                    categoryName: "Impressionism",
                    categoryPicture: 167,
                    amountOfQuestions: 10
                },
                {
                    id: 4,
                    categoryName: "Expressionism",
                    categoryPicture: 86,
                    amountOfQuestions: 10
                },
                {
                    id: 5,
                    categoryName: "Avant-garde",
                    categoryPicture: 126,
                    amountOfQuestions: 10
                },
                {
                    id: 6,
                    categoryName: "Renaissance",
                    categoryPicture: 63,
                    amountOfQuestions: 10
                },
                {
                    id: 7,
                    categoryName: "Surrealism",
                    categoryPicture: 184,
                    amountOfQuestions: 10
                },
                {
                    id: 8,
                    categoryName: "Kitsch",
                    categoryPicture: 225,
                    amountOfQuestions: 10

                },
                {
                    id: 9,
                    categoryName: "Minimalism",
                    categoryPicture: 105,
                    amountOfQuestions: 10
                },
                {
                    id: 10,
                    categoryName: "Interior",
                    categoryPicture: 5,
                    amountOfQuestions: 10
                },
                {
                    id: 11,
                    categoryName: "Nude",
                    categoryPicture: 32,
                    amountOfQuestions: 10
                },
            ],
            pictures: [
                {
                    id: 0,
                    categoryName: "Portrait",
                    categoryPicture: 102,
                    amountOfQuestions: 1
                },
                {
                    id: 1,
                    categoryName: "Landscape",
                    categoryPicture: 10,
                    amountOfQuestions: 10
                },
                {
                    id: 2,
                    categoryName: "Still life",
                    categoryPicture: 117,
                    amountOfQuestions: 10
                },
                {
                    id: 3,
                    categoryName: "Impressionism",
                    categoryPicture: 163,
                    amountOfQuestions: 10
                },
                {
                    id: 4,
                    categoryName: "Expressionism",
                    categoryPicture: 112,
                    amountOfQuestions: 10
                },
                {
                    id: 5,
                    categoryName: "Avant-garde",
                    categoryPicture: 153,
                    amountOfQuestions: 10
                },
                {
                    id: 6,
                    categoryName: "Renaissance",
                    categoryPicture: 104,
                    amountOfQuestions: 10
                },
                {
                    id: 7,
                    categoryName: "Surrealism",
                    categoryPicture: 108,
                    amountOfQuestions: 10
                },
                {
                    id: 8,
                    categoryName: "Kitsch",
                    categoryPicture: 164,
                    amountOfQuestions: 10

                },
                {
                    id: 9,
                    categoryName: "Minimalism",
                    categoryPicture: 214,
                    amountOfQuestions: 10
                },
                {
                    id: 10,
                    categoryName: "Interior",
                    categoryPicture: 176,
                    amountOfQuestions: 10
                },
                {
                    id: 11,
                    categoryName: "Nude",
                    categoryPicture: 107,
                    amountOfQuestions: 10
                },
            ]
        };
    }
    get categories() {
        return this._categories;
    }
}
export default new CategoriesStore();