import axios from 'axios';
import index from './index';
import { Loading } from './loading';

export class Login {
    constructor() {
        this.email = document.getElementById('login-email');
        this.password = document.getElementById('login-password');
        this.submitLogin = document.getElementById('submit-login');
        
        this.loading = new Loading();

        this.registerEvents();
    }

    registerEvents() {
        this.submitLogin.onclick = (e) => this.loginUser(e);
    }

    async loginUser() {
        const { email, password } = this.getInfoLoginUser();

        if ( email ) {
            if ( password ) {
                const main = new index();

                try {
                    const payload = { email, password };

                    this.loading.insertLoadingHtml();

                    const { data } = await axios.post(`${ main.url }login`, payload );

                } catch (error) {
                }
                
                this.loading.removeLoadingHtml();
            } else {

            }
        } else {

        }
    }

    getInfoLoginUser() {
        return {
            email: this.email.value,
            password: this.password.value,
        }; 
    } 

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getSubmitLogin() {
        return this.submitLogin;
    }

    setEmail(value) {
        this.email.value = value;
    }

    setPassword(value) {
        this.password.value = value;
    }
}