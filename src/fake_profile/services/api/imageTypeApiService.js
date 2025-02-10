import ApiService from "@/laboratory/services/api/apiService.js";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";

export default class ImageTypeApiService {

    static servicePath = FakeProfileApiservice.getBaseUrl('/type');

    static async selectAll() {
        return await ApiService.get(`${this.servicePath}`);
    }
}