import ApiService from "@/laboratory/services/api/apiService.js";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";

export default class ModelApiService {

    static servicePath = FakeProfileApiservice.getBaseUrl('/model');

    static async selectAll() {
        return await ApiService.get(`${this.servicePath}`);
    }


}