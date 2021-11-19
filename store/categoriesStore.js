class CategoriesStore {
    constructor() {
        this._categories = [
            {
                id: 0,
                categoryName: "Portrait",
                categoryPicture: 109,
            },
            {
                id: 1,
                categoryName: "Landscape",
                categoryPicture: 9,

            },
            {
                id: 2,
                categoryName: "Still life",
                categoryPicture: 115,

            },
            {
                id: 3,
                categoryName: "Impressionism",
                categoryPicture: 167,

            },
            {
                id: 4,
                categoryName: "Expressionism",
                categoryPicture: 86,

            },
            {
                id: 5,
                categoryName: "Avant-garde",
                categoryPicture: 126,

            },
            {
                id: 6,
                categoryName: "Renaissance",
                categoryPicture: 63,

            },
            {
                id: 7,
                categoryName: "Surrealism",
                categoryPicture: 184,

            },
            {
                id: 8,
                categoryName: "Kitsch",
                categoryPicture: 225,

            },
            {
                id: 9,
                categoryName: "Minimalism",
                categoryPicture: 105,

            },
            {
                id: 10,
                categoryName: "Interior",
                categoryPicture: "5",

            },
            {
                id: 11,
                categoryName: "Nude",
                categoryPicture: 32,

            },

        ];
    }
    get categories() {
        return this._categories;
    }
}
export default new CategoriesStore();