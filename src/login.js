import axios from 'axios';
import { Loading } from "./loading";
import { Utils } from "./utils";
import { HandlePages } from "./handlePages";
import { Recado } from './Recado';

export class Login {
    constructor() {
        this.email = document.getElementById('login-email');
        this.password = document.getElementById('login-password');
        this.submitLogin = document.getElementById('submit-login');
        
        this.loading = new Loading();
        this.utils = new Utils();
        this.handlePages = new HandlePages();
        this.recados = new Recado();

        this.registerEvents();
    }

    registerEvents() {
        this.submitLogin.onclick = (e) => this.loginUser(e);
    }

    async loginUser() {
        this.loading.handleLoading();

        try {
            const payload = this.getInfoLoginUser();
            
            const { data } = await axios.post(`${this.utils.url}login`, payload);
            
            this.handlePages.hideAllPages();
            this.handlePages.showPage('recados');
            
            sessionStorage.setItem("user", JSON.stringify(data));
            
            this.utils.alertify(2, "Usuário logado", 200);
            
            this.recados.getResults();
        } catch (e) {
            this.utils.alertify(2, "Email ou senha inválidos", 500);
        }
        this.loading.handleLoading();
    }

    getInfoLoginUser() {
        return {
            email: this.email.value,
            password: this.password.value,
        }; 
    } 
}