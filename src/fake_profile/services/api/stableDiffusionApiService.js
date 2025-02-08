import ApiService from "@/laboratory/services/api/apiService.js";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";

export default class StableDiffusionApiService {

    static servicePath = FakeProfileApiservice.getBaseUrl('/stable-diffusion');

    static async generate(data) {
        return await ApiService.post(`${this.servicePath}`, data);
    }
}