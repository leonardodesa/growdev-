import axios from 'axios';
import { Utils } from "./utils";
import { Loading } from './loading';
import { HandlePages } from './handlePages';

var config;
var userInfo;
export class Login {
    constructor(recados) {
        this.utils = new Utils();
        this.loading = new Loading();
        this.handlePages = new HandlePages();
        this.recados = recados;
        this.email = document.getElementById('login-email');
        this.password = document.getElementById('login-password');
        this.submitLogin = document.getElementById('submit-login');

        this.registerEvents();
    }

    registerEvents() {
        this.submitLogin.onclick = (e) => this.loginUser(e);
    }

    async loginUser() {
        try {
            const payload = this.getInfoLoginUser();

            this.loading.insertLoadingHtml();

            const { data } = await axios.post(`${ this.utils.url }login`, payload );

            this.loading.removeLoadingHtml();

            this.handlePages.hideAllPages();
            this.handlePages.showPage('recados');

            sessionStorage.setItem("user", JSON.stringify(data));
    
            this.utils.alertify(2, "Usuário logado", 200);

            const ok = await this.recados.getResults();
            console.log(ok);
            
            
        } catch (error) {
            this.loading.removeLoadingHtml();
            this.utils.alertify(2, "Email ou senha inválidos", 500);
        }
    }

    getInfoLoginUser() {
        return {
            email: this.email.value,
            password: this.password.value,
        }; 
    } 
}