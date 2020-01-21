import axios from 'axios';
import { Utils } from "./utils";
import { Loading } from './loading';
import { HandlePages } from './handlePages';
import { Recado } from './Recado';
export class Register {
    constructor() {
        this.utils = new Utils;
        this.loading = new Loading();
        this.handlePages = new HandlePages();
        this.recados = new Recado();

        this.name = document.getElementById('register-name');
        this.email = document.getElementById('register-email');
        this.password = document.getElementById('register-password');
        this.confirmPassword = document.getElementById('register-confirm-password');

        this.registerSubmit = document.getElementById('register');

        this.registerEvents();
    }

    registerEvents() {
        this.registerSubmit.onclick = (e) => this.registerUser(e);
    }

    async registerUser(e) {
        if (this.returnBoolenCheckValuesInputs()) {
            const payload = this.getInfoUser();

            try {
                this.loading.handleLoading();

                const { data } = await axios.post(`${this.utils.url}register`,
                    payload
                );

                sessionStorage.setItem("user", JSON.stringify(data));

                this.handlePages.hideAllPages();
                this.handlePages.showPage('recados');

                this.recados.getResults();

                this.resetform();

                this.utils.alertify(2, "Usuário cadastrado com sucesso", 200);
            } catch (e) {
                this.utils.alertify(2, "Erro ao registrar o usuário", 500);
            }
            this.loading.handleLoading();
        } else {
            this.utils.alertify(2, "Erro ao cadastar o usuário", 401);
        }
    }

    resetform() {
        this.name.value = '';
        this.email.value = ''; 
        this.password.value = ''; 
        this.confirmPassword.value = '';
    }

    returnBoolenCheckValuesInputs() {
        const infoUser = this.getInfoUser();

        for (let key in infoUser)
            if (!infoUser[key])
                return false;

        return true;
    }

    getInfoUser() {
        return {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value,
        }
    }
}
