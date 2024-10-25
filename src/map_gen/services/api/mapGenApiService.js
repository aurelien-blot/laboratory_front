export default class MapGenApiService {

    static baseServicePath = '/mapgen';

    static getBaseUrl(path) {
        return this.baseServicePath + path;
    }

}