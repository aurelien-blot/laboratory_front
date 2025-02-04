import ApiService from "@/laboratory/services/api/apiService.js";

export default class MailService {

    static baseServicePath = '/quickmail';

    static async sendMail(mail) {
        return await ApiService.basicPost(`${this.baseServicePath}`, mail);
    }

}