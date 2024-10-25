import ApiService from "@/laboratory/services/api/apiService.js";
import MapGenApiService from "@/map_gen/services/api/mapGenApiService.js";

export default class MapApiService {

    static servicePath = MapGenApiService.getBaseUrl('/map');

    static async generate(settings) {
        return await ApiService.post(`${this.servicePath}`, settings);
    }

}