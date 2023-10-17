import $api from "../http";

export default class ReklamaService {
  static async getReklamas() {
    return await $api.get('/ad');
  }

  static async getReklamaById(id) {
    return await $api.get(`/ad/${id}`);
  }
}
