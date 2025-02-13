import ApiService from "@/laboratory/services/api/apiService.js";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";

export default class StableDiffusionApiService {

    static servicePath = FakeProfileApiservice.getBaseUrl('/stable-diffusion');

    static async generate(data, templateTitle) {
        const queryParams = new URLSearchParams({ templateTitle }).toString();
        const url = `${this.servicePath}?${queryParams}`;
        return await ApiService.post(url, data);
    }
}