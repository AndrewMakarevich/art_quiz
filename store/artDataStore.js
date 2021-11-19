class ArtDataStore {
    constructor() {
        this._artDatas;
    }

    setArtDatas(data) {
        this._artDatas = data;
    }
    getArtDatas() {
        return this._artDatas;
    }
}
export default new ArtDataStore();