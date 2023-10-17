import { makeAutoObservable, observable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";
import $api from "../http";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    initPage = 1;
    message = "";
    userInfo = {};

    query = "";
    value = "101";
    curPage = 1;
    newNote = false;
    costNote = observable([]);
    mainGroup = "1";
    // favoritePlants = observable(['1']);

    constructor() {
        makeAutoObservable(this);
    }

    // addFavoritePlant = (plantId) => {
    // 	this.favoritePlants.push(plantId);
    // };

    // deleteFavoritePlant = (plantId) => {
    // 	return this.favoritePlants.replace(
    // 		this.favoritePlants.filter((el) => el !== plantId)
    // 	);
    // };

    setInitPage(num) {
        this.initPage = num;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setMessage(message) {
        this.message = message;
    }

    setQuery(query) {
        this.query = query;
    }
    setValue(value) {
        this.value = value;
    }
    setCurPage(curPage) {
        this.curPage = curPage;
    }

    setMainGroup(newGroup) {
        this.mainGroup = newGroup;
    }

    setNewNote(bool) {
        this.newNote = bool;
    }

    setCostNote(note) {
        this.costNote = note;
    }
    // async setPlantToLocalStorage() {
    // 	// if (this.favoritePlants.length > 1) {
    // 	localStorage.setItem('plants', JSON.stringify(this.favoritePlants));
    // 	// }
    // }
    // async getPlantOnLocalStorage() {
    // 	this.favoritePlants = JSON.parse(localStorage.getItem('plants'));
    // }

    // async newMessage() {
    //     try {
    //         const response = await $api.get("/messages/init");
    //         if (response?.data > 0) {
    //             this.setNewNote(true);
    //             this.setCostNote(response?.data);
    //         }
    //         console.log("newMes", response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async login(email, password, navigate) {
        try {
            const response = await AuthService.login(email, password);
            // console.log('response login Context',response)
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response?.data?.user);
            navigate("/draft");
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                console.error(error);
            }
            // error?.response?.data?.message
        }
    }

    // async registration(email: string, password: string) {
    //     try {
    //         const response = await AuthService.registration(email, password);
    //         console.log(response)
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (error) {
    //         console.error(error);
    //         if( error instanceof Error) { console.error(error); }
    //         // console.log(e.response?.data?.message);
    //     }
    // }

    async logout(navigate) {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({});
            navigate("/");
            return;
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                console.error(error);
            }
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/users_amp/refresh`, {
                withCredentials: true,
            });
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                console.error(error);
            }
            // console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}
