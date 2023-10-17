import axios from 'axios';
import {API_URL} from '../http/index';

export default class NewsService {

      static fetchNews(page, limit) {
        return axios.get(`${API_URL}/news/${page}/${limit}`);
    }

    static fetchItemNews(id) {
        return axios.get(`${API_URL}/news/${id}`);
    }
}

