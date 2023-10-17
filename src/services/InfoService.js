import $api from "../http";

export default class InfoService {
    static async fetchInfo() {
        return await $api.get(`/info`);
    }

    static async sendZvk(data) {
        return await $api.post('/info',data)
    }

}

