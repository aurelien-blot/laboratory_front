import ApiService from "@/laboratory/services/api/apiService.js";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";

export default class ImageTypeApiService {

    static servicePath = FakeProfileApiservice.getBaseUrl('/type');

    static async selectAll() {
        return await ApiService.get(`${this.servicePath}`);
    }

    static async create(imageType){
        return await ApiService.post(`${this.servicePath}`, imageType);
    }

    static async update(imageType) {
        return await ApiService.put(`${this.servicePath}`, imageType);
    }

    static async delete(id) {
        return await ApiService.delete(`${this.servicePath}`+'/'+id);
    }
}