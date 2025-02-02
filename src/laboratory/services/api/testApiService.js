import ApiService from "@/laboratory/services/api/apiService.js";
import store from "@/laboratory/store/store.js";

export default class TestApiService {

    static servicePath = '/test';

    static async testConnection(timeout=null) {
        return await ApiService.get(`${this.servicePath}`, timeout);
    }

}