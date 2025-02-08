import ApiService from "@/laboratory/services/api/apiService.js";
import MapGenApiService from "@/map_gen/services/api/mapGenApiService.js";

export default class FakeProfileApiservice {

    static baseServicePath = '/fake-profile';

    static getBaseUrl(path) {
        return this.baseServicePath + path;
    }
}