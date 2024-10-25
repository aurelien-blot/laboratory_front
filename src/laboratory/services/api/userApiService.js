// noinspection ES6UnusedImports

import ApiService from "@/laboratory/services/api/apiService.js";
import store from "@/laboratory/store/store.js";

export default class UserApiService {

    static servicePath = '/user';

    static async getAll() {
        return await ApiService.get(`${UserApiService.servicePath}`);
    }

}