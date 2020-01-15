import axios from 'axios';
import { Utils } from "./utils";

export class Register {
    constructor() {
        this.utils = new Utils;

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

            const { name, token } = await axios.post(`${this.utils.url}register`, payload);
            
            sessionStorage.setItem("token", body.token);

            this.utils.alertify(2, "Usuário cadastrado com sucesso", 200);
        } else {
            this.utils.alertify(2, "Erro ao cadastar o usuário", 401);
        }
    }

    returnBoolenCheckValuesInputs() {
        const infoUser = this.getInfoUser();

        for (let key in infoUser)
            if (!infoUser[key])
                return false;
        
        return true;
    }

    stopEvents(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    getInfoUser() {
        return {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value,
        }
    }

    loginUser() {
        const infoUser = this.getInfoLoginUser();

        const { data } = axios.post();
    }

    getInfoLoginUser() {
        return {
            email: this.email.value,
            password: this.password.value,
        };
    }
}