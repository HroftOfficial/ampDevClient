import $api from "../http";

// PROFILE

export default class Orders {
  static async getOrders() {
    return await $api.get(`/zakazes/get_zakazes`)
  }

  static async addOrder(data) {
      return await $api.post(`/zakazes/add_zakazes`, 
        data, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
  }
  
  static async deleteOrder(id, data) {
    return await $api.post(`/zakazes/delete/${id}`, data)
  }
  static async editOrderAll(id, data) {
    return await $api.put(`/zakazes/update_zakaz/${id}`, data)
  }

  static async addFavorite(data) {
    return await $api.post(`/zakazes/add_favorite`, data)
  }  
  
  static async deleteFavorite(data) {
    return await $api.post(`/zakazes/delete_favorite`, data)
  }  
  
  static async getFavorite() {
    return await $api.get('/zakazes/get_favorite')
  }
}
 