import ApiService from "@/laboratory/services/api/apiService.js";
import MapGenApiService from "@/map_gen/services/api/mapGenApiService.js";

export default class BiomeApiService {

    static servicePath = MapGenApiService.getBaseUrl('/biome');

    static async getAll() {
        return await ApiService.get(`${this.servicePath}`);
    }

}