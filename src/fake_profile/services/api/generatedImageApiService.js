import ApiService from "@/laboratory/services/api/apiService.js";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";

export default class GeneratedImageApiService {

    static servicePath = FakeProfileApiservice.getBaseUrl('/generated-images');

    static async selectAll(templateTitle) {
        let params = {};
        if(templateTitle!=null){
            params ={"templateTitle": templateTitle}
        }

        return await ApiService.get(`${this.servicePath}`, params);
    }

    static async loadPicture(id) {
        return await ApiService.get(`${this.servicePath}`+'/load/'+id);
    }
}