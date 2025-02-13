import ApiService from "@/laboratory/services/api/apiService.js";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";

export default class ModelApiService {

    static servicePath = FakeProfileApiservice.getBaseUrl('/model');

    static async selectAll() {
        return await ApiService.get(`${this.servicePath}`);
    }

    static async create(model) {
        return await ApiService.post(`${this.servicePath}`, model);
    }

    static async update(model) {
        return await ApiService.put(`${this.servicePath}`, model);
    }

    static async delete(id) {
        return await ApiService.delete(`${this.servicePath}`+'/'+id);
    }


}