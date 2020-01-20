import { Login } from './login';
import { Register } from './register';
import { Recado } from './Recado';
import { Utils } from "./utils";
import { Loading } from './loading';
import { HandlePages } from './handlePages';

export default class App {
    constructor() {
        this.utils = new Utils();
        this.loading = new Loading();
        this.handlePages = new HandlePages();
        this.login = new Login();
        this.register = new Register();
        this.recado = new Recado();
    }
}

new App();